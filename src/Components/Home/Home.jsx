import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { getPosts, createPost } from "../../Services/Posts.jsx";
import { getCommentsForPosts, createComment } from "../../Services/Comments.jsx";
import { Container, Card, Form, Button, ListGroup, ButtonGroup, Row, Col, Alert } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';
import AuthorFilter from './AuthorFilter';
import Parse from "parse";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [error, setError] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    async function setupLiveQuery() {
      try {
        const data = await getPosts();
        // Sort the initial data by createdAt in descending order
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedData);
        setFilteredPosts(sortedData);

        // Setup LiveQuery for posts
        const Post = Parse.Object.extend("Post");
        const postQuery = new Parse.Query(Post);
        postQuery.descending("createdAt"); // Order by creation date, newest first
        postQuery.include("author"); // Include the author pointer

        const postSubscription = await postQuery.subscribe();

        postSubscription.on("create", async (newPost) => {
          // Fetch the author information
          const author = newPost.get("author");
          let authorData = null;
          
          if (author) {
            try {
              await author.fetch();
              authorData = {
                id: author.id,
                username: author.get("username") || "Anonymous"
              };
            } catch (err) {
              console.error("Error fetching author:", err);
            }
          }

          const newPostData = {
            id: newPost.id,
            title: newPost.get("title") || "Untitled",
            body: newPost.get("body") || "No content",
            author: authorData,
            createdAt: newPost.get("createdAt") // Include createdAt in the post data
          };
        
          setPosts(prev => {
            if (prev.find(p => p.id === newPostData.id)) return prev;
            // Insert new post at the beginning of the array
            return [newPostData, ...prev];
          });
        
          setFilteredPosts(prev => {
            if (prev.find(p => p.id === newPostData.id)) return prev;
            // Insert new post at the beginning of the array
            return [newPostData, ...prev];
          });
        });

        postSubscription.on("delete", (deletedPost) => {
          setPosts((prev) => prev.filter((p) => p.id !== deletedPost.id));
          setFilteredPosts((prev) => prev.filter((p) => p.id !== deletedPost.id));
        });

        return () => {
          postSubscription.unsubscribe();
        };
      } catch (err) {
        console.error("Error setting up LiveQuery:", err);
        setError("Failed to connect to LiveQuery server.");
      }
    }

    setupLiveQuery();
  }, []);

  useEffect(() => {
    if (selectedAuthor) {
      const filtered = posts.filter(post =>
        post.author?.username === selectedAuthor ||
        (post.author === null && selectedAuthor === 'Anonymous')
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedAuthor, posts]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !newPostTitle.trim()) {
      setError("Please provide both a title and content for your post");
      return;
    }

    try {
      await createPost(newPostTitle, newPost);
      // DO NOT manually setPosts here! LiveQuery will handle it
      setNewPost("");
      setNewPostTitle("");
      setError(null);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div className="position-relative vh-25 bg-primary">
        <div className="position-absolute top-0 start-0 w-100 h-100" 
             style={{ 
               background: 'linear-gradient(90deg, rgba(12,35,64,0.9) 0%, rgba(0,132,61,0.9) 100%)'
             }}>
        </div>
        <div className="container position-relative h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold text-white mb-4">
                Welcome to your feed!
              </h1>
              <p className="lead text-white">
                Here you can see all the posts from your friends.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={11} lg={10} xl={9}>
            {error && (
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            )}

            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <AuthorFilter onFilterChange={setSelectedAuthor} />
                <Form onSubmit={handlePostSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="Enter a title for your post"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Post Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="What's on your mind?"
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit"
                      style={{ backgroundColor: '#0C2340', borderColor: '#0C2340' }}
                    >
                      Post
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {filteredPosts.length > 0 ? (
              <div>
                {filteredPosts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <Alert variant="info">
                No posts found for the selected author.
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function PostItem({ post }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function setupCommentsLiveQuery() {
      try {
        const data = await getCommentsForPosts(post.id);
        setComments(data);

        const Comment = Parse.Object.extend("Comment");
        const commentQuery = new Parse.Query(Comment);
        const postPointer = new Parse.Object("Post");
        postPointer.id = post.id;
        commentQuery.equalTo("post", postPointer);

        const commentSubscription = await commentQuery.subscribe();

        commentSubscription.on("create", (newComment) => {
          const newCommentData = {
            id: newComment.id,
            body: newComment.get("body"),
            name: newComment.get("name"),
            post: post.id
          };
        
          setComments(prev => {
            if (prev.find(c => c.id === newCommentData.id)) return prev; // ALREADY exists
            return [...prev, newCommentData];
          });
        });
        

        commentSubscription.on("delete", (deletedComment) => {
          setComments((prev) => prev.filter((c) => c.id !== deletedComment.id));
        });

        return () => {
          commentSubscription.unsubscribe();
        };
      } catch (err) {
        console.error("Error setting up comment LiveQuery:", err);
      }
    }

    setupCommentsLiveQuery();
  }, [post.id]);

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes((prev) => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        setDislikes((prev) => prev - 1);
      }
      setLikes((prev) => prev + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes((prev) => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        setLikes((prev) => prev - 1);
      }
      setDislikes((prev) => prev + 1);
      setUserReaction('dislike');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await createComment(post.id, newComment);
      setNewComment("");
      // DO NOT manually setComments here! LiveQuery will handle it
    } catch (err) {
      console.error("Error creating comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Posted by {post.author?.username || 'Anonymous'}
          </small>
          <ButtonGroup>
            <Button
              variant={userReaction === 'like' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={handleLike}
              style={{ 
                backgroundColor: userReaction === 'like' ? '#0C2340' : 'transparent',
                borderColor: '#0C2340',
                color: userReaction === 'like' ? 'white' : '#0C2340'
              }}
            >
              <HandThumbsUp /> {likes}
            </Button>
            <Button
              variant={userReaction === 'dislike' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={handleDislike}
              style={{ 
                backgroundColor: userReaction === 'dislike' ? '#0C2340' : 'transparent',
                borderColor: '#0C2340',
                color: userReaction === 'dislike' ? 'white' : '#0C2340'
              }}
            >
              <HandThumbsDown /> {dislikes}
            </Button>
          </ButtonGroup>
        </div>
        {comments.length > 0 && (
          <ListGroup variant="flush" className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{comment.name || "Anonymous"}</strong>
                    <p className="mb-0">{comment.body}</p>
                  </div>
                  {comment.author && (
                    <small className="text-muted">
                      {comment.author.firstName} {comment.author.lastName}
                    </small>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        <Form onSubmit={handleCommentSubmit} className="mt-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
            />
          </Form.Group>
          <div className="d-grid gap-2 mt-2">
            <Button variant="success" type="submit" size="sm" disabled={submitting}>
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

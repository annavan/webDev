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
        setPosts(data);
        setFilteredPosts(data);

        // Setup LiveQuery for posts
        const Post = Parse.Object.extend("Post");
        const postQuery = new Parse.Query(Post);
        postQuery.descending("createdAt");

        const postSubscription = await postQuery.subscribe();

        postSubscription.on("create", (newPost) => {
          const newPostData = {
            id: newPost.id,
            title: newPost.get("title") || "Untitled",
            body: newPost.get("body") || "No content",
            author: newPost.get("author") ? {
              id: newPost.get("author").id,
              username: newPost.get("author").get("username") || "Anonymous"
            } : null
          };
        
          setPosts(prev => {
            if (prev.find(p => p.id === newPostData.id)) return prev; // ALREADY exists
            return [newPostData, ...prev];
          });
        
          setFilteredPosts(prev => {
            if (prev.find(p => p.id === newPostData.id)) return prev; // ALREADY exists
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
      await createPost("New Post", newPost); 
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
    <Container className="pt-20 pb-4">
      <Row className="justify-content-center">
        <Col xs={12} md={11} lg={10} xl={9}>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title className="display-4 text-center">Welcome to your feed!</Card.Title>
              <Card.Text className="lead text-center">Here you can see all the posts from your friends.</Card.Text>
            </Card.Body>
          </Card>

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
                  <Button variant="primary" type="submit">
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
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{post.title}</Card.Title>
          <small className="text-muted">
            Posted by: {post.author?.username || "Anonymous"}
          </small>
        </div>
        <Card.Text>{post.body}</Card.Text>

        <ButtonGroup className="mb-3">
          <Button
            variant={userReaction === 'like' ? 'primary' : 'outline-primary'}
            onClick={handleLike}
            size="sm"
          >
            <HandThumbsUp className="me-1" />
            {likes}
          </Button>
          <Button
            variant={userReaction === 'dislike' ? 'danger' : 'outline-danger'}
            onClick={handleDislike}
            size="sm"
          >
            <HandThumbsDown className="me-1" />
            {dislikes}
          </Button>
        </ButtonGroup>

        {comments.length > 0 && (
          <ListGroup variant="flush">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <strong>{comment.name || "Anonymous"}</strong>: {comment.body}
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

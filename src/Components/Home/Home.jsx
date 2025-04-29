import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { getPosts, createPost } from "../../Services/Posts.jsx";
import { getCommentsForPosts } from "../../Services/Comments";
import { Container, Card, Form, Button, ListGroup, ButtonGroup, Row, Col, Alert } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';
import AuthorFilter from './AuthorFilter';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [error, setError] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts", error);
        setError("Failed to load posts");
      }
    }
    fetchPosts();
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
      const savedPost = await createPost(newPostTitle, newPost);
      setPosts([savedPost, ...posts]);
      setNewPost("");
      setNewPostTitle("");
      setError(null);
    } catch (error) {
      console.error("Error creating post:", error);
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
  const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike', or null

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes(prev => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        setDislikes(prev => prev - 1);
      }
      setLikes(prev => prev + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes(prev => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        setLikes(prev => prev - 1);
      }
      setDislikes(prev => prev + 1);
      setUserReaction('dislike');
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getCommentsForPosts(post.id);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

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
                <strong>{comment.name}</strong>: {comment.body}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

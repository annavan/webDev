import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { getPosts } from "../../Services/Posts.jsx";
import { getCommentsForPosts } from "../../Services/Comments";
import { Container, Card, Form, Button, ListGroup, ButtonGroup, Row, Col } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const savedPost = { id: Date.now(), title: "New Post", body: newPost };
    setPosts([savedPost, ...posts]);
    setNewPost("");
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={11} lg={10} xl={9}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title className="display-4 text-center">Welcome to your feed!</Card.Title>
              <Card.Text className="lead text-center">Here you can see all the posts from your friends.</Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form onSubmit={handlePostSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Create a new post</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
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

          {posts.length > 0 && (
            <div>
              {posts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
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
        <Card.Title>{post.title}</Card.Title>
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

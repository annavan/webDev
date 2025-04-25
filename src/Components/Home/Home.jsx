import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { getPosts } from "../../Services/Posts.jsx";
import { getCommentsForPosts } from "../../Services/Comments";

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
    <div className="container mt-12 pt-5">
      <h1>Welcome to your feed!</h1>
      <p>Here you can see all the posts from your friends.</p>

      {posts.length > 0 && (
        <div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}

      <form onSubmit={handlePostSubmit}>
        <label>
          Post:
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </label>
        <button type="submit">Post</button>
      </form>

      <Footer />
    </div>
  );
}

function PostItem({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    if (!showComments) {
      try {
        const data = await getCommentsForPosts(post.id);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={fetchComments} style={{ color: "blue", cursor: "pointer", background: "none", border: "none" }}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>
      {showComments && (
        <div className="comments-section">
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

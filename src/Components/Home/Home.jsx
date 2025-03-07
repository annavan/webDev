import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { getPosts } from "../../Services/Posts.jsx";
import HomeList from "./HomeList";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        console.log("fetched posts: ", data);
        setPosts(data);
      } catch (error) {
        console.error("error fetching posts", error);
      }
    }
    fetchPosts();
  }, []); //maybe here?

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    // Simulate saving to database
    const savedPost = { id: Date.now(), content: newPost };
    setPosts([savedPost, ...posts]);
    setNewPost("");
  };

  return (
    <div>
      <h1>Welcome to your feed!</h1>
      <p>Here you can see all the posts from your friends.</p>

      {/* Show what the user posted on the home screen */}
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9"
          }}>
            {post.content}
          </div>
        ))}
      </div>

      {/* Form to post something to the screen and save to database */}
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
      {/* <div> 
        <HomeList />
      </div> */}

      {/* Future implementation: Add code to show posts from database */}
      <HomeList posts={posts} />

      {/* Show footer on this page */}
      <Footer />
    </div>
  );
}
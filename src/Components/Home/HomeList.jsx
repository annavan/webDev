import React, { useEffect, useState } from "react";
//import React from "react";
import { getPosts } from "../../Services/Posts";
import HomeItem from "./HomeItem";

const HomeList = ({ posts }) => {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     async function fetchPosts() {
    //         const data = await getPosts();
    //         setPosts(data); 
    //     }
    //     fetchPosts();
    // }, []);

    return (
      <div>
       <h1>All Posts</h1>
       {posts.length > 0 ? (
            posts.map((post) => (
                <HomeItem id={post.id} title={post.title} body={post.body} />
            ))
        ) : (
            <p>No posts found.</p>
        )}
      </div>
    );
  };
  
  export default HomeList;
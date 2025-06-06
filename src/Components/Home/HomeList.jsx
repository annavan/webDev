import React, { useEffect, useState } from "react";
//import React from "react";
import { getPosts } from "../../Services/Posts";
import HomeItem from "./HomeItem";

const HomeList = ({ posts }) => {

    return (
      <div>
       <h1>All Posts</h1>
       {posts.length > 0 ? (
            posts.map((post) => (
                <HomeItem 
                    key={post.id}
                    id={post.id} 
                    title={post.title} 
                    body={post.body}
                    author={post.author}
                />
            ))
        ) : (
            <p>No posts found.</p>
        )}
      </div>
    );
  };
  
  export default HomeList;
import Parse from "parse"

// Use parse to fetch any posts in the Post class in the database
export async function getPosts() {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author"); // Include the author pointer
    
    try {
      const results = await query.find();
      return await Promise.all(results.map(async post => {
        const author = post.get("author");
        // If author exists, fetch their username from the database
        if (author) {
          return {
            id: post.id,
            title: post.get("title") || "Untitled",
            body: post.get("body") || "No content",
            author: {
              id: author.id,
              username: author.get("username")
            }
          };
        }
        // If author doesn't exist, try to fetch it from the database
        const authorId = post.get("authorId");
        if (authorId) {
          const userQuery = new Parse.Query(Parse.User);
          userQuery.equalTo("objectId", authorId);
          const user = await userQuery.first();
          if (user) {
            return {
              id: post.id,
              title: post.get("title") || "Untitled",
              body: post.get("body") || "No content",
              author: {
                id: user.id,
                username: user.get("username")
              }
            };
          }
        }
        // If we can't find the author, return the post without author info
        return {
          id: post.id,
          title: post.get("title") || "Untitled",
          body: post.get("body") || "No content",
          author: null
        };
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
}

// Create a new post in the database
export async function createPost(title, body) {
    const Post = Parse.Object.extend("Post");
    const post = new Post();
    
    try {
        // Set the post data
        post.set("title", title);
        post.set("body", body);
        
        // Set the current user as the author
        const currentUser = Parse.User.current();
        if (currentUser) {
            post.set("author", currentUser);
            // Also store the author ID separately for redundancy
            post.set("authorId", currentUser.id);
        }
        
        // Save the post
        const savedPost = await post.save();
        
        // Return the saved post data with the actual username
        return {
            id: savedPost.id,
            title: savedPost.get("title"),
            body: savedPost.get("body"),
            author: currentUser ? {
                id: currentUser.id,
                username: currentUser.get("username")
            } : null
        };
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}
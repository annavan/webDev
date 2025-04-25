import Parse from "parse"

// Use parse to fetch any posts in the Post class in the database
export async function getPosts() {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    query.include("author"); // Include the author pointer
    
    try {
      const results = await query.find();
      return results.map(post => ({
        id: post.id,
        title: post.get("title") || "Untitled",
        body: post.get("body") || "No content",
        author: post.get("author") ? {
          id: post.get("author").id,
          username: post.get("author").get("username") || "Anonymous"
        } : null
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
        }
        
        // Save the post
        const savedPost = await post.save();
        
        // Return the saved post data
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
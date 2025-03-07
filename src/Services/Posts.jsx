import Parse from "parse"

// Use parse to fetch any posts in the Post class in the database
export async function getPosts() {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
    
    try {
      const results = await query.find();
      return results.map(post => ({
        id: post.id,
        title: post.get("title") || "Untitled",
        body: post.get("body") || "No content",
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
}
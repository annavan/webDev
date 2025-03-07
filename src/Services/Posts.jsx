import Parse from "parse"

export async function getPosts() {
    const Post = Parse.Object.extend("Post");
    const query = new Parse.Query(Post);
  
    try {
      const results = await query.find();
      return results.map(post => ({
        id: post.id,
        //id: post.get("objectId"),
        title: post.get("title") || "Untitled",
        body: post.get("body") || "No content",
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
}

// export const getPosts = async () => {
//     try {
//         const Post = Parse.Object.extend("Post");
//         const query = new Parse.Query(Post);
//         const posts = await query.find();


//         //const results = await query.find();
//         return posts.map(post => ({
//             id: post.id,
//             //author: post.get("author"),
//             title: post.get("title"),
//             body: post.get("body"),
//         }));
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         return [];
//     }
// }
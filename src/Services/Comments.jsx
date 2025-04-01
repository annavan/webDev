import Parse from "parse";

// Use parse to fetch comments for a corresponding post in the database
export async function getCommentsForPosts(postId) {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment); 

    // Retrieving the post pointer within a comment instance
    const postPointer = new Parse.Object("Post");
    postPointer.id = postId;
    query.equalTo("post", postPointer);

    try {
        const comments = await query.find();
        return comments.map(comment => ({
            id: comment.id,
            title: comment.get("title"),
            body: comment.get("body"),
            // Points back to the corresponding Post instance
            post: postPointer.id,
        }))
    } catch (error) {
        console.error("Error fetching comments: ", error);
        return [];
    }
}
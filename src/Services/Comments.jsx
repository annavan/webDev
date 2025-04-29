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

export async function createComment(postId, body) {
    const Comment = Parse.Object.extend("Comment");
    const comment = new Comment();

    const Post = Parse.Object.extend("Post");
    const postPointer = new Post();
    postPointer.id = postId;

    comment.set("post", postPointer);  // Set the pointer to the post
    comment.set("body", body);

    // Optional: link comment to current user
    const currentUser = Parse.User.current();
    if (currentUser) {
        comment.set("author", currentUser);
        comment.set("name", currentUser.get("username")); // or full name
    } else {
        comment.set("name", "Anonymous");
    }

    try {
        const savedComment = await comment.save();
        return {
            id: savedComment.id,
            body: savedComment.get("body"),
            name: savedComment.get("name"),
            post: postId
        };
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}
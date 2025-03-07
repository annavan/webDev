import Parse from "parse";

export async function getCommentsForPosts(postId) {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment); 
    //console.log(postId)

    const postPointer = new Parse.Object("Post");
    postPointer.id = postId;
    query.equalTo("post", postPointer);

    try {
        const comments = await query.find();
        return comments.map(comment => ({
            //id: comment.id,
            id: postPointer.id,
            title: comment.get("title"),
            body: comment.get("body"),
        }))
    } catch (error) {
        console.error("Error fetching comments: ", error);
        return [];
    }
}
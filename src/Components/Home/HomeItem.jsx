import React, { useEffect, useState } from "react";
import { getCommentsForPosts } from "../../Services/Comments";

const HomeItem = ({ id, title, body }) => {
    const [comments, setComments] = useState([]);

    // Asynchronous function to retrieve comments for posts by the posts id
    useEffect(() => {
        async function fetchComments() {
            const data = await getCommentsForPosts(id);
            setComments(data);
        }
        fetchComments();
    }, []);

    return (
        <div className="post-card">
            <h2>{title}</h2>
            <p>{body}</p>
            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>{comment.body}</li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default HomeItem;

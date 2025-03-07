import React from "react";

const HomeItem = ({ title, body }) => {
    return (
        <div className="post-card">
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    );
};

export default HomeItem;

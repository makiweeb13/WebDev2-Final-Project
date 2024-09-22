import React from "react";
import Comment from "./Comment";

function Comments(props) {
    const renderComments = () => {
        return props.comments.map(comment => <Comment key={comment.id} comment={comment} />);
    }

    return <div className="comments">{renderComments()}</div>
}

export default Comments;
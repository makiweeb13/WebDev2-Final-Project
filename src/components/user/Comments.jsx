import React from "react";
import useStore from "../../store/store";
import Comment from "./Comment";

function Comments({ comments }) {
   
    const renderComments = () => {
        return comments.map(comment => <Comment key={comment.id} comment={comment} />);
    }

    return <div className="comments">{renderComments()}</div>
}

export default Comments;
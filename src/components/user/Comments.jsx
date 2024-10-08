import React from "react";
import Comment from "./Comment";
import useStore from "../../store/store";

function Comments({ postId }) {
    const { comments } = useStore();

    const postComments = comments.filter((comment) => comment.post_id == postId);

    const renderComments = () => {
        return postComments.map(comment => <Comment key={comment.id} comment={comment} commentId={comment.id}/>);
    }

    return <div className="comments">{renderComments()}</div>
}

export default Comments;
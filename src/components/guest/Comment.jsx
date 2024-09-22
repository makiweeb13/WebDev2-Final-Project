import React from 'react';
import Comments from './Comments';

function Comment(props) {
    return (
        <>
            <div className="comment">
                <div className="comment-header">
                    <img src={props.comment.profileImg} alt="user profile" />
                    <p className="comment-user-name">{props.comment.username}</p>
                    <p className="comment-date">{props.comment.date}</p>
                </div>
                <p className="comment-content">{props.comment.comment}</p>
                <div className="comment-options">
                    <div>
                        <p className="comment-likes">{props.comment.likes} Likes</p>
                    </div>
                    <div>
                        <p className="comment-dislikes">{props.comment.dislikes} Dislikes</p>
                    </div>
                </div>
            </div>
            <div className="replies">
                <Comments comments={props.comment.replies} />
            </div>
        </>
        
    )
}

export default Comment;
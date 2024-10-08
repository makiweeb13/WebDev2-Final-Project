import React from 'react';
import Comments from './Comments';
import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply } from "@fortawesome/free-solid-svg-icons";
import profile from '../../assets/profile-icon.png';

function Comment({ comment, commentId }) {

    const { comments, getUsername, getComment, getDate } = useStore();

    const replies = comments.filter(comment => comment.parent_id == commentId)

    return (
        <>
            <div className="comment">
                <div className="user-header">
                    <div className='user'>
                        <img src={profile} alt="user profile" className='user-profile'/>
                        <p className="comment-user-name">{getUsername(comment.user_id)}</p>
                        {comment.parent_id && <p>&nbsp;replying to {getUsername(getComment(comment.parent_id).user_id)}</p>}
                    </div>
                    <p className="comment-date">{getDate(comment.date)}</p>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="options">
                    <div>
                        <p className="comment-likes">{comment.likes}&nbsp;</p>
                        <FontAwesomeIcon icon={faThumbsUp} className="menu-icon"/>
                    </div>
                    <div>
                        <p className="comment-dislikes">{comment.dislikes}&nbsp;</p>
                        <FontAwesomeIcon icon={faThumbsDown} className="menu-icon"/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faReply} className="menu-icon"/>
                    </div>
                </div>
            </div>
            <div className="replies">
                <Comments key={comment.id} comments={replies} commentId={comment.id}/>
            </div>
        </>
        
    )
}

export default Comment;
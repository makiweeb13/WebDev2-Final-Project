import React, { useState } from 'react';
import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import profile from '../../assets/profile-icon.png';
import AddComment from './AddComment';
import Cookies from 'js-cookie'; 
import { Link } from 'react-router-dom';

function Comment({ comment }) {

    const { getDate } = useStore();
    const [ toggleReply, setToggleReply ] = useState(false);
    const userId = Cookies.get('userId');
    
    return (
        <>
            <div className="comment">
                <div className="user-header">
                    <div className='user'>
                        <img src={profile} alt="user profile" className='user-profile'/>
                        <p className="comment-user-name">{comment.users.username}</p>
                        {comment.parent_id && <p>&nbsp;replying to {comment.comments.users.username}</p>}
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
                        <FontAwesomeIcon icon={faReply} className="menu-icon" onClick={() => setToggleReply(!toggleReply)}/>
                    </div>
                    {
                        comment.user_id == userId &&
                        <div>
                            <Link>
                            <FontAwesomeIcon icon={faEllipsisVertical} className="menu-icon" />
                            </Link>
                        </div>
                    }
                </div>
            </div>
            { toggleReply && <AddComment postId={comment.post_id} parentId={comment.id}/> }
        </>
        
    )
}

export default Comment;
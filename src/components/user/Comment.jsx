import React from 'react';
import Comments from './Comments';
import useStore from '../../store/store';

function Comment({ key, comment }) {

    const { comments } = useStore();

    const replies = comments.filter(comment => comment.parent_id === key)

    return (
        <>
            <div className="comment">
                <div className="comment-header">
                    <img src="src/assets/profile-icon.png" alt="user profile" className='user-menu-profile'/>
                    <p className="comment-user-name">{comment.username}</p>
                    <p className="comment-date">{comment.date}</p>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-options">
                    <div>
                        <p className="comment-likes">{comment.likes} Likes</p>
                        <a href="">Like</a>
                    </div>
                    <div>
                        <p className="comment-dislikes">{comment.dislikes} Dislikes</p>
                        <a href="">Dislike</a>
                    </div>
                    <a href="">Reply</a>
                </div>
            </div>
            <div className="replies">
                <Comments key={comment.id} comments={replies} />
            </div>
        </>
        
    )
}

export default Comment;
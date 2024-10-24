import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import profile from '../../assets/profile-icon.png';
import Comment from './Comment';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Post({ post, detailedMode }) {

    const { comments, getDate, getGenres, getMediums, getMostPopularComment, updatePost } = useStore();
    const popularComment = getMostPopularComment(post)
    const userId = Cookies.get('userId');

    const handleLikes = async (value) => {
        try {
            const response = await fetch(`http://localhost:5000/posts/${post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(value)
            })
            const data = await response.json();
            if (response.ok) {
                updatePost(data.post)
                console.log(data.message);

            } else {
                console.error(`Post update failed:`, data.message);
            }
        } catch(err) {
            console.error(`Post update request failed`, err)
        }
    }

    return (
        <>
            <div className="post">
                <div className="user-header">
                    <div className='user'>
                        <img src={profile} alt="user profile" className='user-profile'/>
                        <p className="name">{post.users.username}</p>
                    </div>
                    <p className="date">{getDate(post.date)}</p>
                </div>
                <div className="post-content">
                    <p className="title">{post.title}</p>
                    <p className="genres">{getGenres(post)}</p>
                    <p className="status">{post.status}</p>
                    <p className="rate">{post.rate}/10</p>
                    <p className="medium">{getMediums(post)}</p>
                    <p className="synopsis">{post.synopsis}</p>
                    <p className="review">{post.review}</p>
                </div>
                <div className="options">
                    <div className="likes">
                        <p>{post.likes}&nbsp;</p>
                        <FontAwesomeIcon icon={faThumbsUp} className="menu-icon" onClick={() => handleLikes({ likes: ++post.likes })} />
                    </div>
                    <div className="dislikes">
                        <p>{post.dislikes}&nbsp;</p>
                        <FontAwesomeIcon icon={faThumbsDown} className="menu-icon" onClick={() => handleLikes({ dislikes: ++post.dislikes })} />
                    </div>
                    <div>
                        <p>{post.comments.length}&nbsp;</p>
                        <Link to={!detailedMode ? `/post/${post.id}` : ''}>
                            <FontAwesomeIcon icon={faComment} className="menu-icon" />
                        </Link>
                    </div>
                    {
                        post.user_id == userId &&
                        <div>
                            <Link>
                            <FontAwesomeIcon icon={faEllipsisVertical} className="menu-icon" />
                            </Link>
                        </div>
                    }
                </div>
            </div>
            { detailedMode && <Comments comments={comments} /> }
            { !detailedMode && popularComment && <Comment key={popularComment.id} comment={popularComment} commentId={popularComment.id}/> }
        </>
    )
}

export default Post;
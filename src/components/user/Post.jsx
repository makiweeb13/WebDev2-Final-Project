import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from "@fortawesome/free-solid-svg-icons";
import profile from '../../assets/profile-icon.png';
import Comment from './Comment';
import Comments from './Comments';
import { Link } from 'react-router-dom';

function Post({ post, detailedMode }) {

    const { getUsername, getDate, getCommentsNum, getMostPopularComment } = useStore();
    const popularComment = getMostPopularComment(post.id);

    // const displayImages = () => {
    //     let imgID = 1;
    //     if (props.post.images != []) {
    //         return props.post.images.map(img => <img key={imgID++} src={img} width="200"></img>)
    //     }
    // }
    
    return (
        <>
            <div className="post">
                <div className="user-header">
                    <div className='user'>
                        <img src={profile} alt="user profile" className='user-profile'/>
                        <p className="name">{getUsername(post.user_id)}</p>
                    </div>
                    <p className="date">{getDate(post.date)}</p>
                </div>
                <div className="post-content">
                    <p className="title">{post.title}</p>
                    <p className="genres">{post.genre}</p>
                    <p className="status">{post.status}</p>
                    <p className="rate">{post.rate}/10</p>
                    <p className="medium">{post.medium}</p>
                    <p className="synopsis">{post.synopsis}</p>
                    <p className="review">{post.review}</p>
                </div>
                <div className="options">
                    <div className="likes">
                        <p>{post.likes}&nbsp;</p>
                        <FontAwesomeIcon icon={faThumbsUp} className="menu-icon"/>
                    </div>
                    <div className="dislikes">
                        <p>{post.dislikes}&nbsp;</p>
                        <FontAwesomeIcon icon={faThumbsDown} className="menu-icon"/>
                    </div>
                    <div>
                        <p>{getCommentsNum(post.id)}&nbsp;</p>
                        <Link to={!detailedMode ? `/post/${post.id}` : ''}>
                            <FontAwesomeIcon icon={faComment} className="menu-icon"/>
                        </Link>
                    </div>
                </div>
                {/* <div className="images">{displayImages()}</div>*/}
            </div>
            { detailedMode ? 
                <Comments postId={post.id} /> :
                <Comment key={popularComment.id} comment={popularComment} commentId={popularComment.id}/>
            }
        </>
    )
}

export default Post;
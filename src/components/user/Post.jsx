import React from 'react';
import Comments from './Comments';

function Post({ post }) {

    const displayImages = () => {
        let imgID = 1;
        if (props.post.images != []) {
            return props.post.images.map(img => <img key={imgID++} src={img} width="200"></img>)
        }
    }
    
    return (
        <>
            <div className="post">
                <div className="post-header">
                    <img src="src/assets/profile-icon.png" alt="user profile" className='user-menu-profile'/>
                    <p className="name"></p>
                    <p className="date">{post.date}</p>
                </div>
                <div className="post-content">
                    <p className="title">{post.title}</p>
                    <p className="genres">{post.genre.join(', ')}</p>
                    <p className="status">{post.status}</p>
                    <p className="rate">{post.rate}/10</p>
                    <p className="medium">{post.medium}</p>
                    <p className="synopsis">{post.synopsis}</p>
                    <p className="review">{post.review}</p>
                </div>
                <div className="post-options">
                    <div className="likes">
                        <p>{post.likes} Likes</p>
                        <a href="">Like</a>
                    </div>
                    <div className="dislikes">
                        <p>{post.dislikes} Dislikes</p>
                        <a href="">Dislike</a>
                    </div>
                    <a href="">Comments</a>
                </div>
                {/* <div className="images">{displayImages()}</div>*/}
            </div>
            <Comments postId={post.id}/>
        </>
    )
}

export default Post;
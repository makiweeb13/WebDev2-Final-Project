import React from 'react';
import Comments from './Comments';

function Post(props) {

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
                    <img src="" alt="user profile" />
                    <p className="name">{props.post.username}</p>
                    <p className="date">{props.post.date}</p>
                </div>
                <div className="post-content">
                    <p className="title">{props.post.title}</p>
                    <p className="genres">{props.post.genre.join(', ')}</p>
                    <p className="status">{props.post.status}</p>
                    <p className="rate">{props.post.rate}/10</p>
                    <p className="medium">{props.post.medium.join('/')}</p>
                    <p className="synopsis">{props.post.synopsis}</p>
                    <p className="review">{props.post.review}</p>
                </div>
                <div className="post-options">
                    <div className="likes">
                        <p>{props.post.likes} Likes</p>
                    </div>
                    <div className="dislikes">
                        <p>{props.post.dislikes} Dislikes</p>
                    </div>
                    <a href="">Comments</a>
                </div>
                {/* <div className="images">{displayImages()}</div>*/}
            </div>
            <Comments comments={props.post.comments} />
        </>
    )
}

export default Post;
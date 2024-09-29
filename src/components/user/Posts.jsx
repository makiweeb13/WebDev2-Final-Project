import React from 'react';
import Post from './Post';

function Posts(props) {

    const renderPosts = () => {
        return props.posts.map(post =>
            <Post key={post.id} post={post} />
        )
    }

    return <div className="posts">{renderPosts()}</div>
}

export default Posts;
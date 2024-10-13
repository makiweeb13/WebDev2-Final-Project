import React from 'react';
import Post from './Post';
import useStore from '../../store/store';

function Posts() {

    const { posts } = useStore();

    const renderPosts = () => {
        return posts.map(post => <Post key={post.id} post={post} />)
    }

    return <div className="posts">{renderPosts()}</div>
}

export default Posts;
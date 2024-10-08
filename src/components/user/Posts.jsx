import React from 'react';
import Post from './Post';
import useStore from '../../store/store';
import { useState, useEffect } from 'react';

function Posts({ userId }) {

    const { posts } = useStore();

    const renderPosts = () => {
        if (userId == undefined) {
            return posts.map(post => <Post key={post.id} post={post} />)
        } else {
            return posts
                .filter(post => post.user_id == userId)
                .map(post => <Post key={post.id} post={post} />)
        }
    }

    return <div className="posts">{renderPosts()}</div>
}

export default Posts;
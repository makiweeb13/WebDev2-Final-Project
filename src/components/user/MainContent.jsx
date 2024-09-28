import React from 'react';
import useStore from '../../store/store';
import Posts from './Posts';

function MainContent() {
    
    const { posts } = useStore();

    return (
        <main>
            <h2>Home</h2>
            <Posts posts={posts} />
        </main>
    )
}

export default MainContent
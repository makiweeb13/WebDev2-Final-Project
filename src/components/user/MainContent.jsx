import { useState, useEffect } from 'react';
import useStore from '../../store/store';
import Posts from './Posts';

function MainContent() {
    const { setPosts } = useStore();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/posts')
            .then((res) => res.json())
            .then((posts) => {
                setPosts(posts)
                setIsLoading(false);
            })
            .catch((error) => console.error('Error fetching posts:', error));
    }, [])

    if (!isLoading) {
        return (
            <main>
                <h2>Home</h2>
                <Posts />
            </main>
        )
    }
}

export default MainContent
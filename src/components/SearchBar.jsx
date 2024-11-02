import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useStore from '../store/store';
import { useState } from 'react';

function SearchBar() {
    const { setPosts } = useStore();
    const [ title, setTitle ] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: title })
            })
            const data = await response.json();
            if (response.ok) {
                setPosts(data)
            }
        } catch(err) {
            console.error('Fetching posts failed:', err)
        }
    }

    return (
        <div className="search-bar">
            <input 
                type="search" 
                name="search"  
                id="search"
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="search by title"
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="menu-icon" onClick={handleSearch}/>
        </div>
    )
}

export default SearchBar;
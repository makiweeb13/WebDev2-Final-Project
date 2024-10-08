import React from 'react';
import { useState, useEffect } from 'react';
import Posts from './Posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import profile from '../../assets/profile-icon.png';

function Profile() {
    
    const { id } = useParams();
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/users/${id}`)
            .then(response => response.json())
            .then(json => {
                setUser(json);
                setIsLoading(false);
            })
            .catch(err => {
                throw Error('User Not Found')
            })
    }, [id])
    
    if (!isLoading) {
        return (
            <main>
                <div className="profile">
                    <img src={profile} alt="profile picture" />
                    <FontAwesomeIcon icon={faPen} className="menu-icon edit"/>
                    <div className="profile-details">
                        <h1 className="username">{user.username}</h1>
                        <h4 className="email">{user.email}</h4>
                        <p className="bio">{user.bio}</p>
                    </div>
                </div>
                <h2>Posts</h2>
                <Posts userId={id}/>
            </main>
        )
    }
}

export default Profile;
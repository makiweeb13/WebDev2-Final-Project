import React from 'react';
import { useState, useEffect } from 'react';
import useStore from '../../store/store';
import Posts from './Posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    
    const { users, getUser } = useStore();
    
    return (
        <main>
            <div className="profile">
                <img src="src/assets/profile-icon.png" alt="profile picture" />
                <FontAwesomeIcon icon={faPen} className="menu-icon edit"/>
                <div className="profile-details">
                    <h1 className="username">{users[0].username}</h1>
                    <h4 className="email">{users[0].email}</h4>
                    <p className="bio">{users[0].bio}</p>
                </div>
            </div>
            <h2>Posts</h2>
            <Posts userId={1}/>
        </main>
    )
}

export default Profile;
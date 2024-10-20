import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import profile from '../../assets/profile-icon.png';
import Cookies from 'js-cookie'

function UserHeader() {
    const userId = Cookies.get('userId');

    return (
        <header>
            <h1>Recco</h1>
            <div className="search-bar">
                <input type="search" name="search" id="search" placeholder="title, name of author, characters, ..."/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="menu-icon" />
            </div>
            <div className="user-options">
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} className="menu-icon" />
                </Link>
                <Link>
                    <FontAwesomeIcon icon={faBell} className="menu-icon" />
                </Link>
                <Link to="/create-post">
                    <button className="create-post-btn">
                        <p><FontAwesomeIcon icon={faPlus} /> Create</p>
                    </button>
                </Link>
                <Link to={`profile/${userId}`}>
                    <img src={profile} alt="user profile" className="user-menu-profile"/>
                </Link>
            </div>
        </header>
    )
}

export default UserHeader;
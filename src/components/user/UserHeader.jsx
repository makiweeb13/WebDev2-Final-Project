import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";

function Header() {
    return (
        <header>
            <h1>Recco</h1>
            <div className="search-bar">
                <input type="search" name="search" id="search" placeholder="title, name of author, characters, ..."/>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className="user-options">
                <Link to="/home">
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
                <Link to="/profile">
                    <img src="src/assets/profile-icon.png" alt="user profile" className="user-menu-profile"/>
                </Link>
            </div>
        </header>
    )
}

export default Header;
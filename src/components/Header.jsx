import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
    return (
        <header>
            <h1>Recco</h1>
            <div className="search-bar">
                <input type="search" name="search" id="search" placeholder="title, name of author, characters, ..."/>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className="guest-options">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <p>or</p> 
                <Link to="/signup">
                    <button>Register</button>
                </Link>
            </div>
        </header>
    )
}

export default Header;
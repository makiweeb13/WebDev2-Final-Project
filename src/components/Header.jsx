import React from "react";
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Recco</h1>
            <div className="search-bar">
                <input type="search" name="search" id="search" placeholder="title, name of author, characters, ..."/>
                <button>Search</button>
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
import React from "react";

function Header() {
    return (
        <header>
            <h1>Recco</h1>
            <div className="search-bar">
                <input type="search" name="search" id="search" placeholder="title, name of author, characters, ..."/>
                <button>Search</button>
            </div>
            <div className="guest-options">
                <a href="http://" rel="noopener noreferrer">
                    <button>Login</button>
                </a>
                <p>or</p> 
                <a href="http://" rel="noopener noreferrer">
                    <button>Register</button>
                </a>
            </div>
        </header>
    )
}

export default Header;
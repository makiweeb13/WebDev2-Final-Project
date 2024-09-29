import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Login() {
    return (
        <div className="page">
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} className="menu-icon"/></Link>
            <form action="login">
                <input type="username" name="username" placeholder="username"/><br />
                <input type="password" name="password" id="password" placeholder="password"/><br />
                <button type="submit">Login</button>
                <p>Don't have an account yet? <Link to="/signup" className="link">Create Account</Link></p>
            </form>
        </div>
        
    )
}

export default Login;
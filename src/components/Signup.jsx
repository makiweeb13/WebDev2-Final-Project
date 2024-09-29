import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Signup() {
    return (
        <div className="page">
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} className="menu-icon"/></Link>
            <form action="signup">
                <input type="username" name="username" placeholder="username"/><br />
                <input type="email" name="email" id="email" placeholder="email"/><br />
                <input type="password" name="password" id="password" placeholder="password"/><br />
                <input type="password" name="confirm-password" id="confirm-password" placeholder="confirm password" /><br />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
            </form>
        </div>
        
    )
}

export default Signup;
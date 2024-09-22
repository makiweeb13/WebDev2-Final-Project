import React from "react";
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <>
            <Link to="/">Back</Link>
            <form action="signup">
                <label htmlFor="username">Username</label>
                <input type="username" name="username"/><br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"/><br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/><br />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" id="confirm-password" /><br />
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <button type="submit">Sign Up</button>
            </form>
        </>
        
    )
}

export default Signup;
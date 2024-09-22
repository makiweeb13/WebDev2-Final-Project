import React from "react";
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <Link to="/">Back</Link>
            <form action="login">
                <label htmlFor="username">Username</label>
                <input type="username" name="username"/><br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/><br />
                <button type="submit">Login</button>
                <p>Don't have an account yet? <Link to="/signup">Create Account</Link></p>
            </form>
        </>
        
    )
}

export default Login;
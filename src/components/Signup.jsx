import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"

function Signup() {
    const [ user, setUser ] = useState({});
    
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    console.log(user)

    return (
        <div className="page">
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} className="menu-icon"/></Link>
            <form action="signup">
                <input 
                    type="username" 
                    name="username" 
                    placeholder="username" 
                    value={user.username}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="email" 
                    value={user.email}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="password" 
                    value={user.password}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirm-password" 
                    placeholder="confirm password" 
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
            </form>
        </div>
        
    )
}

export default Signup;
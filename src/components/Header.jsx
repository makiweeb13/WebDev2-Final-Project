import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
    return (
        <header>
            <h1>Recco</h1>
            <SearchBar />
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
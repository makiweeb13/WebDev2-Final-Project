import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import profile from '../../assets/profile-icon.png';
import Cookies from 'js-cookie';

function UserHeader() {
    const userId = Cookies.get('userId');

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                Cookies.remove('userId');
                Cookies.remove('userEmail');
            } else {
                console.error('Logout failed', data.message);
            }
        } catch(err) {
            console.error('Logout request failed:', err);
        }
    }

    return (
        <header>
            <h1>Recco</h1>
            <div className="search-bar">
                <input type="search" name="search" id="search" placeholder="title, name of author, characters, ..."/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="menu-icon" />
            </div>
            <div className="user-options">
                <Link to="/">
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
                <div className="dropdown align-right">
                    <img src={profile} alt="user profile" className="user-menu-profile"/>
                    <div className="dropdown-content">
                        
                        <label>
                            <Link to={`/profile/${userId}`} className="user">Profile</Link>
                        </label>
                        <label>
                            <Link to={`/login`} className="user" onClick={handleLogout}>Logout</Link>
                        </label>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default UserHeader;
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // adjust path as needed


const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        // add header className and style
        // add logo and title
        // add logout button and user info
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-14 w-auto object-contain" />
                <span className="text-2xl font-semibold tracking-wide hover:text-gray-300 transition">Country App</span>
            </Link>
            {user && (
                <div className="flex items-center space-x-4">
                    <span className="text-gray-200">Welcome, <strong>{user.username}</strong></span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;

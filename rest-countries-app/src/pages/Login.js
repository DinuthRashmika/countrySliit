import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Link } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-gray-300 p-8 rounded-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 font-semibold"
                >
                    Login
                </button>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-black font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;

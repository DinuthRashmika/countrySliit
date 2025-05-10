import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Link } from 'react-router-dom';


const Register = () => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert('Registered successfully');
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-gray-300 p-8 rounded-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {['fullName', 'username', 'email', 'password'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            {field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder={field === 'fullName' ? 'John Doe' : ''}
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 font-semibold"
                >
                    Register
                </button>
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;

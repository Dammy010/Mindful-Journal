import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password } = formData;
    if (!name.trim() || !email.trim() || !password.trim()) {
      return setError('All fields are required');
    }

    setLoading(true);
    try {
      await axios.post('/auth/register', formData);
      await fetchUser();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-16 p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Create Your Account
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute top-10 right-3 text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-3 rounded-md font-semibold transition duration-200 ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline font-semibold">
          Log in
        </Link>
      </p>
    </section>
  );
}

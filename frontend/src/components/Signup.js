import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Signup({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-100 to-secondary py-8 px-4">
      <div className="card max-w-md w-full fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo-bookstore.jpeg" alt="Bookstore Logo" className="w-12 h-12 rounded-lg object-cover shadow-elegant" />
            <h1 className="text-3xl font-bold text-primary">BookStore</h1>
          </Link>
          <h2 className="text-2xl font-semibold text-accent-800 mb-2">Create Account</h2>
          <p className="text-accent-600">Join us and start managing your books</p>
        </div>

        {error && (
          <div className="bg-accent-100 border-l-4 border-primary text-accent-800 p-4 mb-6 rounded fade-in">
            <p className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-accent-800 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              disabled={loading}
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-accent-800 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={loading}
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-accent-800 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={loading}
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-accent-800 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              disabled={loading}
              className="input-field"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner w-6 h-6"></div>
                <span className="ml-2">Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-accent-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-accent-800 font-medium transition-colors">
              Sign in
            </Link>
          </p>
          <Link to="/" className="btn btn-outline inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
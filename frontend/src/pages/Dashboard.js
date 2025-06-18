import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import api from '../services/api';
import './Dashboard.css';

function Dashboard({ setIsAuthenticated }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Logo click: always go to home page
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  }, [setIsAuthenticated, navigate]);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get('/auth/verify');
      } catch (error) {
        setError(error.response?.data?.message || 'Authentication failed');
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, [handleLogout]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          <span className="icon">🔄</span>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav compact-nav">
        <div className="nav-content compact-nav-content">
          <button onClick={handleLogoClick} className="logo" title="Bookstore Home">
            <img src="/logo-bookstore.jpeg" alt="Bookstore Logo" className="logo-img" />
            <span className="logo-title">BookStore</span>
          </button>
          <div className="nav-links compact-nav-links">
            <Link to="/" className="btn btn-outline">
              <span className="icon">🏠</span>
              Home
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">
              <span className="icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <section className="form-section">
            <BookForm
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
              onSuccess={() => {
                setFetchTrigger(prev => prev + 1);
                setSelectedBook(null);
              }}
            />
          </section>

          <section className="list-section">
            <BookList
              setSelectedBook={setSelectedBook}
              fetchTrigger={fetchTrigger}
            />
          </section>
        </div>
      </main>

      <footer className="dashboard-footer compact-footer">
        <div className="footer-content compact-footer-content">
          <span>&copy; 2025 BookStore</span>
          <span className="footer-links compact-footer-links">
            <a href="https://github.com/adityakmrtiwari" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <span className="icon">🐙</span>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/adityakmrtiwari/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <span className="icon">💼</span>
              LinkedIn
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Home.css';

function Home({ isAuthenticated, setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    topGenres: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await api.get('/auth/verify');
          setUser(data.user);
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated, setIsAuthenticated]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await api.get('/books');
          setRecentBooks((data?.data || []).slice(-3).reverse());
        } catch (error) {
          setRecentBooks([]);
        }
      }
    };
    fetchRecentBooks();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats/public');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  // Logo click: always go to home page
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/', { replace: true });
  };

  return (
    <div className="home-container">
      <nav className="home-nav compact-nav">
        <div className="nav-content compact-nav-content">
          <button onClick={handleLogoClick} className="logo" title="Bookstore Home">
            <img src="/logo-bookstore.jpeg" alt="Bookstore Logo" className="logo-img" />
            <span className="logo-title">BookStore</span>
          </button>
          <div className="nav-links compact-nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-outline">
                  <span className="icon">📚</span>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-danger">
                  <span className="icon">🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  <span className="icon">🔑</span>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  <span className="icon">✨</span>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="home-main">
        {isAuthenticated ? (
          <section className="welcome-section card">
            <div className="user-welcome">
              <div className="user-avatar">
                {user?.name?.[0]?.toUpperCase() || '👤'}
              </div>
              <div className="user-info">
                <h2>Welcome back, {user?.name || user?.email?.split('@')[0]}!</h2>
                <p>Manage your books and discover new ones</p>
              </div>
            </div>
            <div className="quick-actions">
              <Link to="/dashboard" className="btn btn-primary">
                <span className="icon">📚</span>
                Go to Dashboard
              </Link>
            </div>

            {recentBooks.length > 0 && (
              <section className="recent-books">
                <h3>Your Recent Books</h3>
                <ul className="book-list">
                  {recentBooks.map((book) => (
                    <li key={book._id}>📘 {book.title}</li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        ) : (
          <section className="hero-section card">
            <div className="hero-content">
              <h1>Welcome to Your Digital Library</h1>
              <p>Discover, manage, and organize your books in one place</p>
              <div className="hero-buttons">
                <Link to="/signup" className="btn btn-primary">
                  <span className="icon">🚀</span>
                  Get Started
                </Link>
                <Link to="#features" className="btn btn-outline">
                  <span className="icon">📖</span>
                  Learn More
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Mission Section */}
        <section className="mission-section card">
          <h2 className="section-title">🌟 Our Mission</h2>
          <p>
            BookStore is designed to help book enthusiasts and collectors manage their personal libraries
            efficiently. We believe in making book management accessible, organized, and enjoyable for everyone.
          </p>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section card">
          <h2 className="section-title">🚀 What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>Book Management</h3>
              <p>Add, edit, and organize your books with ease</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Smart Search</h3>
              <p>Find your books quickly with our powerful search</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3>Mobile Friendly</h3>
              <p>Access your library from any device</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🏷️</span>
              <h3>Categories</h3>
              <p>Organize books by genres and tags</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section card">
          <h2 className="section-title">📊 Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📚</span>
              <h3>{stats.totalBooks}</h3>
              <p>Books Added</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🏆</span>
              <h3>{stats.topGenres.length}</h3>
              <p>Popular Genres</p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="tech-stack-section card">
          <h2 className="section-title">🛠 Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Frontend</h3>
              <ul>
                <li>React.js</li>
                <li>React Router</li>
                <li>Axios</li>
                <li>CSS3</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>Tools & Services</h3>
              <ul>
                <li>Git</li>
                <li>npm</li>
                <li>MongoDB Atlas</li>
                <li>VS Code</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="developer-section card">
          <h2 className="section-title">👨‍💻 About the Developer</h2>
          <div className="developer-card">
            <div className="developer-info">
              <h3>Aditya Kumar Tiwari</h3>
              <p className="developer-role">Full Stack Developer</p>
              <p className="developer-bio">
                A passionate developer focused on creating user-friendly web applications.
                This project was built with the goal of helping book lovers manage their
                collections more effectively.
              </p>
              <div className="developer-links">
                <a href="https://github.com/adityakmrtiwari" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <span className="icon">🐙</span>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/adityakmrtiwari/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <span className="icon">💼</span>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section card">
          <h2 className="section-title">📬 Have Questions?</h2>
          <p>Reach out to us at <a href="mailto:support@bookstore.com" className="btn btn-outline">
            <span className="icon">✉️</span>
            adityakmrtiwari@gmail.com
          </a></p>
        </section>
      </main>

      <footer className="home-footer compact-footer">
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

export default Home;

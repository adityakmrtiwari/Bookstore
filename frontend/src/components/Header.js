import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated && setIsAuthenticated(false);
    navigate('/', { replace: true });
  };
  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-black/80 to-black/30 backdrop-blur-md border-b border-accent-200 shadow-elegant">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[56px] px-2 sm:px-4 gap-2">
        <button onClick={handleLogoClick} className="flex items-center gap-2 group focus:outline-none" title="Bookstore Home">
          <img src="/logo-bookstore.jpeg" alt="Bookstore Logo" className="w-12 h-12 rounded-lg object-cover shadow-elegant border-2 border-white/40 group-hover:border-primary group-hover:shadow-lg transition-all duration-300" />
          <span className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wide">BookStore</span>
        </button>
        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {user && (
                <button
                  onClick={() => navigate('/profile')}
                  className="btn btn-outline header-btn flex items-center gap-2"
                  title="Profile"
                >
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                  </span>
                  <span className="font-semibold text-white">{user.name || user.email}</span>
                </button>
              )}
              {isDashboard ? (
                <Link to="/" className="btn btn-outline header-btn">Home</Link>
              ) : (
                <Link to="/dashboard" className="btn btn-outline header-btn">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="btn btn-primary header-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline header-btn">Login</Link>
              <Link to="/signup" className="btn btn-primary header-btn">Sign Up</Link>
            </>
          )}
        </nav>
        {/* Mobile nav: three dots menu */}
        <div className="sm:hidden relative">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white text-2xl shadow-elegant"
            onClick={handleMenuToggle}
            aria-label="Open menu"
          >
            &#8942;
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur border border-white/20 rounded-xl shadow-elegant z-50">
              <ul className="flex flex-col py-2">
                {isAuthenticated ? (
                  <>
                    <li>
                      <button
                        onClick={() => { navigate('/profile'); handleMenuClose(); }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-primary/30 flex items-center gap-2"
                      >
                        <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                          {user && (user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase())}
                        </span>
                        <span>{user && (user.name || user.email)}</span>
                      </button>
                    </li>
                    <li>
                      {isDashboard ? (
                        <Link to="/" className="block px-4 py-2 text-white hover:bg-primary/30" onClick={handleMenuClose}>Home</Link>
                      ) : (
                        <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-primary/30" onClick={handleMenuClose}>Dashboard</Link>
                      )}
                    </li>
                    <li>
                      <button
                        onClick={() => { handleLogout(); handleMenuClose(); }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-primary/30"
                      >Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="block px-4 py-2 text-white hover:bg-primary/30" onClick={handleMenuClose}>Login</Link>
                    </li>
                    <li>
                      <Link to="/signup" className="block px-4 py-2 text-white hover:bg-primary/30" onClick={handleMenuClose}>Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header; 
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard({ setIsAuthenticated, user }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Logo click: always go to home page
  // const handleLogoClick = (e) => {
  //   e.preventDefault();
  //   navigate('/');
  // };

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

  // Show form for add or edit
  const handleAddBook = () => {
    setSelectedBook(null);
    setShowForm(true);
  };
  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };
  const handleFormSuccess = () => {
    setFetchTrigger(prev => prev + 1);
    setSelectedBook(null);
    setShowForm(false);
  };
  const handleFormCancel = () => {
    setSelectedBook(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent-100 to-secondary">
        <div className="card flex flex-col items-center gap-6 fade-in">
          <div className="loading-spinner"></div>
          <p className="text-accent-800 text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent-100 to-secondary">
        <div className="card flex flex-col items-center gap-6 fade-in">
          <div className="text-3xl">⚠️</div>
          <h2 className="text-2xl font-bold text-primary">Oops! Something went wrong</h2>
          <p className="text-accent-600">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent-100 to-secondary">
        <Header isAuthenticated={true} setIsAuthenticated={setIsAuthenticated} user={user} />
        <main className="flex-1 flex flex-col items-center px-4 py-8 gap-12">
          <div className="w-full max-w-3xl flex flex-col gap-8">
            {showForm ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <button onClick={handleFormCancel} className="btn btn-outline">
                    ← Back
                  </button>
                  <h2 className="text-2xl font-bold text-primary">{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
                  <span></span>
                </div>
                <BookForm
                  selectedBook={selectedBook}
                  setSelectedBook={setSelectedBook}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
                  <button onClick={handleAddBook} className="btn btn-primary">
                    + Add Book
                  </button>
                </div>
                <BookList
                  setSelectedBook={handleEditBook}
                  fetchTrigger={fetchTrigger}
                />
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;

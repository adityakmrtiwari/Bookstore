import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BookList.css';

function BookList({ setSelectedBook, fetchTrigger }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/books');
        setBooks(data?.data || []);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setError(error.response?.data?.message || 'Failed to load books. Please try again.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [fetchTrigger]);

  const handleEdit = (book) => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      const { data } = await api.delete(`/books/${id}`);
      setBooks(prevBooks => prevBooks.filter((book) => book._id !== id));
      setSuccess(data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Delete failed:', error);
      setError(error.response?.data?.message || 'Failed to delete book. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="book-list-container loading">
        <div className="loading-spinner"></div>
        <p>Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="book-list-container card">
      <div className="book-list-header">
        <h3>📚 Your Books</h3>
        <div className="book-list-stats">
          <span className="book-count">{books?.length || 0} books</span>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError('')} className="alert-close">×</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span className="alert-icon">✅</span>
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="alert-close">×</button>
        </div>
      )}

      {!books?.length ? (
        <div className="no-books">
          <div className="no-books-icon">📚</div>
          <p>You haven't added any books yet.</p>
          <p className="no-books-subtitle">Start by adding your first book!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="book-title">{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span className="category-badge">{book.category}</span>
                  </td>
                  <td>₹{book.price}</td>
                  <td>
                    <div className="rating">
                      {'★'.repeat(Math.floor(book.rating))}
                      {'☆'.repeat(5 - Math.floor(book.rating))}
                      <span className="rating-value">({book.rating})</span>
                    </div>
                  </td>
                  <td className="actions">
                    <button 
                      className="btn btn-outline edit-btn" 
                      onClick={() => handleEdit(book)}
                      title="Edit book"
                    >
                      <span className="icon">✏️</span>
                    </button>
                    <button 
                      className="btn btn-danger delete-btn" 
                      onClick={() => handleDelete(book._id)}
                      title="Delete book"
                    >
                      <span className="icon">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;

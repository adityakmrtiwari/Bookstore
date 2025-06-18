import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './BookForm.css';

function BookForm({ selectedBook, setSelectedBook, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    rating: '',
    publishedDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title || '',
        author: selectedBook.author || '',
        category: selectedBook.category || '',
        price: selectedBook.price || '',
        rating: selectedBook.rating || '',
        publishedDate: selectedBook.publishedDate ? new Date(selectedBook.publishedDate).toISOString().split('T')[0] : ''
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating)
      };

      if (selectedBook) {
        const { data } = await api.put(`/books/${selectedBook._id}`, bookData);
        setSuccess(data.message);
      } else {
        const { data } = await api.post('/books', bookData);
        setSuccess(data.message);
      }

      setFormData({
        title: '',
        author: '',
        category: '',
        price: '',
        rating: '',
        publishedDate: ''
      });
      setSelectedBook(null);
      onSuccess();
    } catch (error) {
      console.error('Failed to save book:', error);
      setError(error.response?.data?.message || 'Failed to save book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedBook(null);
    setFormData({
      title: '',
      author: '',
      category: '',
      price: '',
      rating: '',
      publishedDate: ''
    });
  };

  return (
    <div className="book-form-container card">
      <div className="form-header">
        <h2>{selectedBook ? 'Edit Book' : 'Add New Book'}</h2>
        <p>{selectedBook ? 'Update your book details' : 'Fill in the details to add a new book'}</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span className="alert-icon">✅</span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">
            <span className="input-icon">📖</span>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">
            <span className="input-icon">✍️</span>
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">
            <span className="input-icon">🏷️</span>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-input"
          >
            <option value="">Select a category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Self-Help">Self-Help</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              <span className="input-icon">💰</span>
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">
              <span className="input-icon">⭐</span>
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Enter rating"
              min="0"
              max="5"
              step="0.1"
              required
              disabled={loading}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">
            <span className="input-icon">📅</span>
            Published Date
          </label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          {selectedBook && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-outline"
              disabled={loading}
            >
              <span className="icon">❌</span>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                {selectedBook ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <span className="icon">
                  {selectedBook ? '✏️' : '➕'}
                </span>
                {selectedBook ? 'Update Book' : 'Add Book'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm; 
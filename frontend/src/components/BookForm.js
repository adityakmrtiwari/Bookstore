import React, { useState, useEffect } from 'react';
import api from '../services/api';

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
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur border border-white/30 rounded-xl shadow-elegant p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2 fade-in">{selectedBook ? 'Edit Book' : 'Add New Book'}</h2>
        <p className="text-accent-600">{selectedBook ? 'Update your book details' : 'Fill in the details to add a new book'}</p>
      </div>

      {error && (
        <div className="bg-accent-100 border-l-4 border-primary text-accent-800 p-4 mb-6 rounded fade-in">
          <p className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </p>
        </div>
      )}

      {success && (
        <div className="bg-accent-100 border-l-4 border-accent-800 text-accent-800 p-4 mb-6 rounded fade-in">
          <p className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span>{success}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-accent-800 font-medium">
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
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="block text-accent-800 font-medium">
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
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-accent-800 font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading}
            className="input-field"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-accent-800 font-medium">
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
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rating" className="block text-accent-800 font-medium">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Enter rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              required
              disabled={loading}
              className="input-field"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="publishedDate" className="block text-accent-800 font-medium">
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
            className="input-field"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex-1"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner w-6 h-6"></div>
                <span className="ml-2">Saving...</span>
              </div>
            ) : (
              selectedBook ? 'Update Book' : 'Add Book'
            )}
          </button>
          {selectedBook && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm; 
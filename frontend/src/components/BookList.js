// BookList with Table + Responsive Card View
import React, { useEffect, useState } from 'react';
import api from '../services/api';

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
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      const { data } = await api.delete(`/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      setSuccess(data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete book. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="loading-spinner mb-4"></div>
        <p className="text-accent-800 text-lg font-medium">Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Your Books</h3>
        <span className="text-accent-600">{books?.length || 0} books</span>
      </div>

      {error && (
        <div className="bg-accent-100 border-l-4 border-primary text-accent-800 p-4 mb-6 rounded fade-in">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2">
              <span className="text-lg">⚠️</span><span>{error}</span>
            </p>
            <button onClick={() => setError('')} className="text-accent-600 hover:text-primary">×</button>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-accent-100 border-l-4 border-accent-800 text-accent-800 p-4 mb-6 rounded fade-in">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2">
              <span className="text-lg">✅</span><span>{success}</span>
            </p>
            <button onClick={() => setSuccess('')} className="text-accent-600 hover:text-primary">×</button>
          </div>
        </div>
      )}

      {!books?.length ? (
        <div className="flex flex-col items-center justify-center py-16 fade-in">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-accent-800 text-lg font-medium mb-2">You haven't added any books yet.</p>
          <p className="text-accent-600">Start by adding your first book!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          {books.map((book) => (
            <div key={book._id} className="card bg-white/10 backdrop-blur border border-white/30 rounded-xl shadow-elegant p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-primary">{book.title}</h3>
                <span className="inline-block bg-accent-100 text-primary rounded-full px-3 py-1 text-xs font-semibold">{book.category}</span>
              </div>
              <div className="text-accent-700 text-sm mb-1"><span className="font-semibold">Author:</span> {book.author}</div>
              <div className="text-accent-700 text-sm mb-1"><span className="font-semibold">Price:</span> ₹{book.price}</div>
              <div className="text-accent-700 text-sm mb-1"><span className="font-semibold">Published:</span> {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'N/A'}</div>
              <div className="flex items-center gap-1 text-sm text-accent-600 mb-2">
                <span className="text-primary">{'★'.repeat(Math.floor(book.rating))}</span>
                <span className="text-accent-400">{'☆'.repeat(5 - Math.floor(book.rating))}</span>
                <span className="ml-1 text-xs">({book.rating})</span>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => handleEdit(book)} className="btn btn-outline flex-1">Edit</button>
                <button onClick={() => handleDelete(book._id)} className="btn btn-primary flex-1">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;

const User = require('../models/User');
const Book = require('../models/Book');

exports.getPublicStats = async (req, res) => {
  try {
    const [totalUsers, totalBooks, books] = await Promise.all([
      User.countDocuments(),
      Book.countDocuments(),
      Book.find().sort({ createdAt: -1 }).limit(6)
    ]);

    // Get top genres
    const genreCounts = {};
    const booksWithGenres = await Book.find({ category: { $exists: true } });
    booksWithGenres.forEach(book => {
      if (book.category) {
        genreCounts[book.category] = (genreCounts[book.category] || 0) + 1;
      }
    });

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([genre]) => genre);

    // Get top authors
    const authorCounts = {};
    booksWithGenres.forEach(book => {
      if (book.author) {
        authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
      }
    });

    const topAuthors = Object.entries(authorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([author]) => author);

    res.json({
      totalUsers,
      totalBooks,
      topGenres,
      topAuthors,
      recentBooks: books
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
}; 
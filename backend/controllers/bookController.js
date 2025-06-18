const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      user: req.user._id
    };

    if (!bookData.title || !bookData.author || !bookData.category) {
      return res.status(400).json({
        success: false,
        message: 'Title, author, and category are required'
      });
    }

    const book = await Book.create(bookData);
    
    const populatedBook = await Book.findById(book._id).populate('user', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: populatedBook
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create book'
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, category, rating, search } = req.query;
    const query = { user: req.user._id };

    if (author) query.author = { $regex: author, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found or you do not have permission to access it'
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found or you do not have permission to update it'
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found or you do not have permission to delete it'
      });
    }

    await book.deleteOne();

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
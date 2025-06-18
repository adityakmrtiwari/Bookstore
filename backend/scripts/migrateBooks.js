const mongoose = require('mongoose');
const Book = require('../models/Book');
const User = require('../models/User');
require('dotenv').config();

async function migrateBooks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the first user (you can modify this to use a specific user)
    const user = await User.findOne();
    if (!user) {
      console.error('No user found in the database');
      process.exit(1);
    }

    // Update all books without a user field
    const result = await Book.updateMany(
      { user: { $exists: false } },
      { $set: { user: user._id } }
    );

    console.log(`Updated ${result.modifiedCount} books with user field`);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrateBooks(); 
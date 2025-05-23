const Library = require('../models/library.model');

// Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Library({ title, author, status: 'available' });
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { borrowerName } = req.body;

    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status === 'borrowed')
      return res.status(409).json({ message: 'Book is already borrowed' });

    book.status = 'borrowed';
    book.borrowerName = borrowerName;
    book.borrowDate = new Date();
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days later
    book.returnDate = null;
    book.overdueFees = 0;

    await book.save();
    res.status(200).json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book', error: error.message });
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status !== 'borrowed')
      return res.status(409).json({ message: 'Book is not currently borrowed' });

    book.status = 'available';
    book.returnDate = new Date();

    // Calculate overdue fees
    const dueDate = book.dueDate;
    const returnDate = book.returnDate;
    let overdueFees = 0;
    if (returnDate > dueDate) {
      const diffTime = Math.abs(returnDate - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      overdueFees = diffDays * 10; // Rs. 10 per day
    }
    book.overdueFees = overdueFees;

    // Reset borrower details
    book.borrowerName = null;
    book.borrowDate = null;
    book.dueDate = null;

    await book.save();
    res.status(200).json({ message: 'Book returned successfully', book, overdueFees });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error: error.message });
  }
};

// Get all books with optional filters
const getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (title) filter.title = new RegExp(title, 'i'); // case-insensitive search

    const books = await Library.find(filter);
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Delete a book if not borrowed
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Library.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status === 'borrowed')
      return res.status(409).json({ message: 'Cannot delete a borrowed book' });

    await Library.findByIdAndDelete(bookId);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

module.exports = {
  addBook,
  borrowBook,
  returnBook,
  getBooks,
  deleteBook,
};

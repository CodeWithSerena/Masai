
const Book = require('../models/Book');
const Member = require('../models/Member');

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, memberId } = req.body;
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });
    if (book.status === 'borrowed') return res.status(400).json({ error: 'Book already borrowed' });

    book.borrowers.push(memberId);
    book.status = 'borrowed';
    await book.save();

    member.borrowedBooks.push(bookId);
    await member.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookId, memberId } = req.body;
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    book.borrowers = book.borrowers.filter(b => b.toString() !== memberId);
    if (book.borrowers.length === 0) book.status = 'available';
    await book.save();

    member.borrowedBooks = member.borrowedBooks.filter(b => b.toString() !== bookId);
    await member.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookBorrowers = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('borrowers', 'name email');
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    await Member.updateMany({}, { $pull: { borrowedBooks: bookId } });
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

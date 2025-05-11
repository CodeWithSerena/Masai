import db from '../models/bookModel.js';

export const returnCheckMiddleware = async (req, res, next) => {
  await db.read();
  const book = db.data.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const borrowedDate = new Date(book.borrowedDate);
  const now = new Date();
  const diff = Math.floor((now - borrowedDate) / (1000 * 60 * 60 * 24));
  if (diff < 3) {
    return res.status(400).json({ error: 'Book cannot be returned within 3 days of borrowing.' });
  }
  next();
};
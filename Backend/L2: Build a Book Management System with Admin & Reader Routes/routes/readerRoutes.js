const express = require('express');
import { getAvailableBooks, borrowBook, returnBook } from '../controllers/readerController.js';
import { returnCheckMiddleware } from '../middlewares/returnCheckMiddleware.js';
const router = express.Router();

router.get('/books', getAvailableBooks);
router.post('/borrow/:id', borrowBook);
router.post('/return/:id', returnCheckMiddleware, returnBook);

export default router;
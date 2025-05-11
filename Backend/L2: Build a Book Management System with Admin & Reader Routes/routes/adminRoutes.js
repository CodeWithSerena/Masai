const express = require('express');
import { addBook, getAllBooks, updateBook, deleteBook } from '../controllers/adminController.js';
const router = express.Router();

router.post('/', addBook);
router.get('/', getAllBooks);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
const express = require('express');
import adminRoutes from './routes/adminRoutes.js';
import readerRoutes from './routes/readerRoutes.js';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/admin/books', adminRoutes);
app.use('/reader', readerRoutes);

app.use('*', (req, res) => res.status(404).json({ error: '404 Not Found' }));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
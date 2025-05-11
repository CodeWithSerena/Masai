import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import fs from 'fs';

// Path to the database file
const file = join('./db.json');

// Check if the file exists, if not create it with default data
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify({ books: [] }), 'utf-8');
}

const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize data with default if not already set
db.data = db.data || { books: [] };

// Read the data from the file (async)
await db.read();

// If there's no data, we write the default structure
if (!db.data.books) {
  db.data.books = [];
  await db.write();
}

export default db;

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbFilePath = path.join(__dirname, 'public', 'db', 'db.json');

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Require the modules
const { v4: uuidv4 } = require('./uuid');
const { readAndAppend, readFromFile, readAndRemove } = require('./fsUtils');
const notesRouter = require('./notes');

// Register the notesRouter middleware
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const notesRouter = require('./routes/routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbFilePath = path.join(__dirname, 'db', 'db.json');

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


app.use('/api', notesRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});





app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

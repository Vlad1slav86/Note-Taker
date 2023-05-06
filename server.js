const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Read the notes from db.json
const getNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
  return JSON.parse(data);
};

// Save the notes to db.json
const saveNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes), 'utf8');
};

// API route to get the notes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = getNotes();
  // Assign a unique id to the new note
  newNote.id = Date.now().toString();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const notes = getNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  saveNotes(updatedNotes);
  res.sendStatus(204);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

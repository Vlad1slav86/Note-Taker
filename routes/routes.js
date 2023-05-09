const router = require('express').Router();
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for creating a new note
router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.status(400).json('Error: Title and Text are required.');
  }
});

// DELETE Route for deleting a note by ID
router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  readAndRemove(id, './db/db.json');
  res.json('Your note has been deleted');
});

module.exports = router;

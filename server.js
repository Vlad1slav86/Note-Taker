const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.get('/api/notes', (req, res) => {
 
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

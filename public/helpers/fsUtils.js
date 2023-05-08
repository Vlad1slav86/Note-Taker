const fs = require('fs').promises;

// Function to read from a file
const readFromFile = (filePath) => fs.readFile(filePath, 'utf8');

// Function to append data to a file
const readAndAppend = (data, filePath) =>
  fs.writeFile(filePath, `${JSON.stringify(data)}\n`, { flag: 'a' });

// Function to remove data from a file
const readAndRemove = async (id, filePath) => {
  const data = await readFromFile(filePath);
  const notes = JSON.parse(data);
  const filteredNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(filePath, JSON.stringify(filteredNotes));
};

module.exports = { readFromFile, readAndAppend, readAndRemove };

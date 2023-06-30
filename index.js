const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get All Data
app.get('/api/data', (req, res) => {
  const allData = data.getAllData();
  res.json(allData);
});

// Get One Data by ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const item = data.getOneData(id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Data not found.' });
  }
});

// Add Data
app.post('/api/data', (req, res) => {
  const newItem = req.body;
  data.addData(newItem);
  res.status(201).json({ message: 'Data added successfully.' });
});

// Update Data
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;

  const success = data.updateData(id, updatedItem);

  if (success) {
    res.json({ message: 'Data updated successfully.' });
  } else {
    res.status(404).json({ message: 'Data not found.' });
  }
});

// Delete Data
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;

  const success = data.deleteData(id);

  if (success) {
    res.json({ message: 'Data deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Data not found.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
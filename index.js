const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let mahasiswas = require('./data.json');

app.get('/mahasiswas', (req, res) => {
  res.json(mahasiswas);
});

app.get('/mahasiswas/:id', (req, res) => {
  const id = req.params.id;
  const mahasiswa = mahasiswas.find((m) => m.id === id);

  if (mahasiswa) {
    res.json(mahasiswa);
  } else {
    res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
  }
});

app.post('/mahasiswas', (req, res) => {
  const newMahasiswa = req.body;
  mahasiswas.push(newMahasiswa);
  res.status(201).json(newMahasiswa);
});

app.put('/mahasiswas/:id', (req, res) => {
  const id = req.params.id;
  const updatedMahasiswa = req.body;

  mahasiswas = mahasiswas.map((m) => {
    if (m.id === id) {
      return { ...m, ...updatedMahasiswa };
    }
    return m;
  });

  res.json(updatedMahasiswa);
});

app.delete('/mahasiswas/:id', (req, res) => {
  const id = req.params.id;

  mahasiswas = mahasiswas.filter((m) => m.id !== id);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

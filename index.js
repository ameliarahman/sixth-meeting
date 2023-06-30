const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mahasiswa = require('./mahasiswa');

app.set('view engine', 'ejs');

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.render('index');
});

// Route untuk menampilkan halaman profile
app.get('/mahasiswa/profile', (req, res) => {
  const allMahasiswa = mahasiswa.getAllMahasiswa();
  res.render('profile', { mahasiswa: allMahasiswa });
});

// Route untuk menampilkan halaman list mahasiswa
app.get('/mahasiswa', (req, res) => {
  const allMahasiswa = mahasiswa.getAllMahasiswa();
  res.render('list-mahasiswa', { mahasiswa: allMahasiswa });
});

// Route untuk menampilkan detail mahasiswa berdasarkan ID
app.get('/mahasiswa/profile/:id', (req, res) => {
  const id = req.params.id;
  const mahasiswaById = mahasiswa.getMahasiswaById(id);
  res.render('detail-mahasiswa', { mahasiswa: mahasiswaById });
});

// Route for deleting a mahasiswa
app.delete('/mahasiswa/delete/:id', (req, res) => {
    const id = req.params.id;
    mahasiswa.deleteMahasiswa(id);
    res.redirect('/mahasiswa');
});

// Route for updating a mahasiswa
app.put('/mahasiswa/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedMahasiswa = {
    id: id,
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address
  };
  mahasiswa.updateMahasiswa(updatedMahasiswa);
  res.redirect('/mahasiswa');
});

// Route for inserting a new mahasiswa
app.post('/mahasiswa/insert', (req, res) => {
  const newMahasiswa = {
    id: req.body.id,
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address
  };
  mahasiswa.insertMahasiswa(newMahasiswa);
  res.redirect('/mahasiswa');
});

app.listen(port, () => {
    console.log(`Server running on port [${port}](http://localhost:${port})`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = require('./data.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// Menampilkan halaman Menu
app.get('/', (req, res) => {
  res.render('menu');
});

// Menampilkan halaman profile
app.get("/profile", (req, res) => {
  const dataMahasiswa = [
    {
      name: "Fauzi Ihsan Anshori",
      nim: "V3922021",
      address: "Karanganyar",
    },
  ];
  res.render("profile", { mahasiswa: dataMahasiswa });
});

// Menampilkan halaman List Mahasiswa
app.get('/list', (req, res) => {
  res.render('list', { mahasiswas: data.data });
});

//Get All
app.get('/api/mahasiswa', (req, res) => {
  res.json(data);
});

//Get One
app.get('/api/mahasiswa/:id', (req, res) => {
  const mahasiswa = data.data.find(mhs => mhs.id === req.params.id);
  if (mahasiswa) {
    res.json(mahasiswa);
  } else {
    res.status(404).json({ error: 'Mahasiswa not found' });
  }
});

//Create
app.post('/api/mahasiswa', (req, res) => {
  const newMahasiswa = {
    id: generateId(),
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address
  };

  data.data.push(newMahasiswa);
  res.status(201).json(newMahasiswa);
});

//Update
app.put('/api/mahasiswa/:id', (req, res) => {
  const mahasiswa = data.data.find(mhs => mhs.id === req.params.id);
  if (mahasiswa) {
    mahasiswa.name = req.body.name;
    mahasiswa.nim = req.body.nim;
    mahasiswa.address = req.body.address;
    res.json(mahasiswa);
  } else {
    res.status(404).json({ error: 'Mahasiswa not found' });
  }
});

//Delete
app.delete('/api/mahasiswa/:id', (req, res) => {
  const index = data.data.findIndex(mhs => mhs.id === req.params.id);
  if (index !== -1) {
    const deletedMahasiswa = data.data.splice(index, 1)[0];
    res.json(deletedMahasiswa);
  } else {
    res.status(404).json({ error: 'Mahasiswa not found' });
  }
});

// Fungsi untuk menghasilkan ID unik
function generateId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
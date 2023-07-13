const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// Menambahkan body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tugas_ejs'
});

// Menghubungkan ke database MYSQL
connection.connect(err => {
  if (err) throw err;
  console.log('Berhasil terhubung ke database MySQL');
});

// Routing halaman Index
app.get('/', (req, res) => {
  res.render('index');
});

// Routing halaman Profile personal
app.get('/profile', (req, res) => {
  const profileData = {
    name: 'Fauzi Ihsan Anshori',
    nim: 'V3922021',
    address: 'Karanganyar, Jawa Tegah',
    hoby: 'Membaca dan menulis,',
    gols: 'Hack NASA',
  };
  res.render('profile', { profileData });
});

// Routing halaman list mhs
app.get('/list', (req, res) => {
  const query = 'SELECT * FROM mahasiswa';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.render('list', { mahasiswaData: result });
  });
});

// GET / Mendapatkan semua data mhs
app.get('/api/mahasiswa', (req, res) => {
  const query = 'SELECT * FROM mahasiswa';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// GET / Mendapatkan data mhs berdasarkan ID
app.get('/api/mahasiswa/:id', (req, res) => {
  const query = `SELECT * FROM mahasiswa WHERE id = '${req.params.id}'`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// MENAMBAH data mhs
app.post('/api/mahasiswa', (req, res) => {
  const { name, nim, address } = req.body;
  const query = `INSERT INTO mahasiswa (name, nim, address) VALUES ('${name}', '${nim}', '${address}')`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data mahasiswa berhasil ditambahkan.' });
  });
});

// UPDATE data mhs berdasarkan ID
app.put('/api/mahasiswa/:id', (req, res) => {
  const { name, nim, address } = req.body;
  const query = `UPDATE mahasiswa SET name = '${name}', nim = '${nim}', address = '${address}' WHERE id = '${req.params.id}'`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data mahasiswa berhasil diupdate.' });
  });
});

// DELETE data mhs berdasarkan ID
app.delete('/api/mahasiswa/:id', (req, res) => {
  const query = `DELETE FROM mahasiswa WHERE id = '${req.params.id}'`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data mahasiswa berhasil dihapus.' });
  });
});

// Menjalankan server sesuai portnya
app.listen(port, () => {
  console.log(`Server berjalan pada localhost:${port}`);
});
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ejs',
  port: 3306
});

// Menghubungkan ke database MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  const nama = 'Ulfiatul Khusna Sani';
  const nim = 'V3922043';
  res.render('profile', { nama, nim });
});

app.get('/listMahasiswa', (req, res) => {
    // Mengambil data mahasiswa dari database
    connection.query('SELECT NIM, Nama FROM mahasiswa', (error, results) => {
      if (error) {
        console.error('Error querying database', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

    // Mengirim data mahasiswa ke view
    res.render('listMahasiswa', { mahasiswa: results });
  });
});

// API Routes
// Read All Mahasiswa
app.get('/api/mahasiswa', (req, res) => {
  // Mengambil data mahasiswa dari database
  connection.query('SELECT * FROM mahasiswa', (error, results) => {
    if (error) {
      console.error('Error querying database', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Mengirim data mahasiswa sebagai respons
    res.json(results);
  });
});

// Read One Mahasiswa
app.get('/api/mahasiswa/:id', (req, res) => {
  const id = req.params.id;

  // Mengambil data mahasiswa dengan ID tertentu dari database
  connection.query('SELECT * FROM mahasiswa WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error querying database', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Mahasiswa not found' });
      return;
    }

    // Mengirim data mahasiswa yang ditemukan sebagai respons
    res.json(results[0]);
  });
});

// Create Mahasiswa
app.post('/api/mahasiswa', (req, res) => {
  const newMahasiswa = req.body;

  // Menyimpan data mahasiswa ke dalam tabel
  connection.query('INSERT INTO mahasiswa SET ?', newMahasiswa, (error, results) => {
    if (error) {
      console.error('Error querying database', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Mengirim data mahasiswa yang baru ditambahkan sebagai respons
    res.status(201).json(newMahasiswa);
  });
});

// Update Mahasiswa
app.put('/api/mahasiswa/:id', (req, res) => {
  const id = req.params.id;
  const updatedMahasiswa = req.body;

  // Memperbarui data mahasiswa di dalam tabel
  connection.query('UPDATE mahasiswa SET ? WHERE id = ?', [updatedMahasiswa, id], (error, results) => {
    if (error) {
      console.error('Error querying database', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Mengirim data mahasiswa yang telah diperbarui sebagai respons
    res.json(updatedMahasiswa);
  });
});

// Delete Mahasiswa
app.delete('/api/mahasiswa/:id', (req, res) => {
  const id = req.params.id;

  // Menghapus data mahasiswa dari tabel
  connection.query('DELETE FROM mahasiswa WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error querying database', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Mengirim respons bahwa mahasiswa telah dihapus
    res.json({ message: 'Mahasiswa deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
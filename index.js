const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;
const mahasiswa = require('./mahasiswa.js');

app.set('view engine', 'ejs');

// Middleware untuk parsing body request
app.use(express.urlencoded({ extended: true }));

// Menampilkan halaman utama dengan menu
app.get('/', (req, res) => {
    res.render('index');
});

// Menampilkan halaman profil mahasiswa
app.get('/profile', (req, res) => {
    // Ganti dengan data mahasiswa yang sesuai
    const mahasiswa = {
        nama: "M. Farhan",
        alamat: "Jambi",
        nim: "M010002"
    };
    res.render('profile', { mahasiswa });
});


// Menampilkan halaman daftar mahasiswa dari file JSON
app.get('/list-mahasiswa', (req, res) => {
    fs.readFile('mahasiswa.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.render('error');
        } else {
            const mahasiswa = JSON.parse(data).data;
            res.render('list-mahasiswa', { mahasiswa });
        }
    });
});

app.use(express.json());

// Mendapatkan semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
    fs.readFile('mahasiswa.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const mahasiswa = JSON.parse(data).data;
            res.json(mahasiswa);
        }
    });
});

// Mendapatkan data mahasiswa berdasarkan ID
app.get('/mahasiswa/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('mahasiswa.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const mahasiswa = JSON.parse(data).data;
            const result = mahasiswa.find((mhs) => mhs.id === id);
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'Mahasiswa not found' });
            }
        }
    });
});

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const mahasiswaByNim = mahasiswa.getMahasiswaByNim(nim);

    // Mengirim data sebagai respons JSON
    res.json(mahasiswaByNim);
});

// Contoh penggunaan getAllMahasiswa
const allMahasiswa = mahasiswa.getAllMahasiswa();
console.log(allMahasiswa);

// Contoh penggunaan getMahasiswaByNim
const nim = 'M010002';
const mahasiswaByNim = mahasiswa.getMahasiswaByNim(nim);
console.log(mahasiswaByNim);


app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});
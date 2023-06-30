const mysql = require('mysql2');

// Konfigurasi koneksi ke database
const databaseconfig = {
  host: 'localhost',
  user: 'root',
  database: 'mahasiswa'
};

// Membuat koneksi ke database
const connection = mysql.createConnection(databaseconfig);

// Membuka koneksi
connection.connect((error) => {
  if (error) {
    console.error('Koneksi database gagal:', error);
  } else {
    console.log('Koneksi database berhasil');
  }
});

// Fungsi untuk menambahkan data mahasiswa ke database
function insertMahasiswa(mahasiswa) {
  const { name, nim, address } = mahasiswa;
  const query = `INSERT INTO mahasiswa (name, nim, address) VALUES (?, ?, ?)`;
  connection.query(query, [name, nim, address], (error, results) => {
    if (error) throw error;
    console.log('Data mahasiswa berhasil ditambahkan');
  });
}

// Fungsi untuk update data mahasiswa berdasarkan ID
function updateMahasiswa(id, updatedMahasiswa) {
  const { name, nim, address } = updatedMahasiswa;
  const query = `UPDATE mahasiswa SET name = ?, nim = ?, address = ? WHERE id = ?`;
  connection.query(query, [name, nim, address, id], (error, results) => {
    if (error) throw error;
    console.log('Data mahasiswa berhasil diperbarui');
  });
}

// Fungsi untuk menghapus data mahasiswa dari database berdasarkan ID
function deleteMahasiswa(id) {
  const query = `DELETE FROM mahasiswa WHERE id = ?`;
  connection.query(query, [id], (error, results) => {
    if (error) throw error;
    console.log('Data mahasiswa berhasil dihapus');
  });
}

const db = require('./db');

const mahasiswa = {
  name: 'John Doe',
  nim: 'M012345',
  address: 'Jakarta'
};

db.insertMahasiswa(mahasiswa);


module.exports = {
  insertMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
};

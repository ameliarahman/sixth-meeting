const mysql = require("mysql2");

// Konfigurasi koneksi ke database
const databaseconfig = {
  host: "localhost",
  user: "root",
  database: "final",
};

// Membuat koneksi ke database
const connection = mysql.createConnection(databaseconfig);

// Membuka koneksi
connection.connect();

// Fungsi untuk menambahkan data mahasiswa ke database
function insertMahasiswa(mahasiswa) {
  const { nama, nim, address } = mahasiswa;
  const query = `INSERT INTO mahasiswa (nama, nim, address) VALUES ('${nama}', '${nim}', '${address}')`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log("Data mahasiswa berhasil ditambahkan");
  });
}

// Fungsi untuk update data mahasiswa berdasarkan ID
function updateMahasiswa(id, updatedMahasiswa) {
  const { nama, nim, address } = updatedMahasiswa;
  const query = `UPDATE mahasiswa SET nama = '${nama}', nim = '${nim}', address = '${address}' WHERE id = '${id}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log("Data mahasiswa berhasil diperbarui");
  });
}

// Fungsi untuk menghapus data mahasiswa dari database berdasarkan ID
function deleteMahasiswa(id) {
  const query = `DELETE FROM mahasiswa WHERE id = '${id}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log("Data mahasiswa berhasil dihapus");
  });
}

module.exports = {
  insertMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
};

const fs = require('fs');
const path = require('path');
const data = require('./mahasiswa.json');
const db = require('./db.js');

function getAllMahasiswa() {
  return data.data;
}

function getMahasiswaById(id) {
  const result = data.data.filter(mahasiswa => mahasiswa.id === id);
  return result.length > 0 ? result[0] : null;
}

function insertMahasiswa(mahasiswa) {
  // Generate random ID character
  const id = generateRandomId();

  // Add ID to the mahasiswa object
  mahasiswa.id = id;

  // Push mahasiswa to data array
  data.data.push(mahasiswa);

  // Write data to mahasiswa.json file
  const filePath = path.join(__dirname, 'mahasiswa.json');
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.log('Error writing to mahasiswa.json:', err);
    } else {
      console.log('Data has been added to mahasiswa.json');
    }
  });

  // Insert mahasiswa to the database
  db.insertMahasiswa(mahasiswa);
}

function updateMahasiswa(id, updatedMahasiswa) {
  const index = data.data.findIndex(mahasiswa => mahasiswa.id === id);
  if (index !== -1) {
    data.data[index] = {
      id,
      ...updatedMahasiswa
    };

    // Write data to mahasiswa.json file
    const filePath = path.join(__dirname, 'mahasiswa.json');
    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.log('Error writing to mahasiswa.json:', err);
      } else {
        console.log('Data has been updated in mahasiswa.json');
      }
    });

    // Update mahasiswa in the database
    db.updateMahasiswa(id, updatedMahasiswa);
  }
}

function deleteMahasiswa(id) {
  const index = data.data.findIndex(mahasiswa => mahasiswa.id === id);
  if (index !== -1) {
    data.data.splice(index, 1);

    // Write data to mahasiswa.json file
    const filePath = path.join(__dirname, 'mahasiswa.json');
    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.log('Error writing to mahasiswa.json:', err);
      } else {
        console.log('Data has been deleted from mahasiswa.json');
      }
    });

    // Delete mahasiswa from the database
    db.deleteMahasiswa(id);
  }
}

// Generate random ID character
function generateRandomId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

module.exports = {
  getAllMahasiswa,
  getMahasiswaById,
  insertMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
};

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
  // Get the current highest ID
  const highestId = data.data.reduce((maxId, mahasiswa) => {
    return mahasiswa.id > maxId ? mahasiswa.id : maxId;
  }, 0);

  // Generate the new ID by incrementing the highest ID by 1
  const newId = highestId + 1;

  // Add ID to the mahasiswa object
  mahasiswa.id = newId;

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

module.exports = {
  getAllMahasiswa,
  getMahasiswaById,
  insertMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
};
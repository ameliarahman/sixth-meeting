const fs = require('fs');

// Read data from JSON file
const rawData = fs.readFileSync('mahasiswa.json');
const data = JSON.parse(rawData);

// Function to get all mahasiswa
function getAllMahasiswa(payload) {
    let result = data;
    if (payload && payload.nim) {
        result = data.data.filter((mahasiswa) => mahasiswa.nim === payload.nim);
    }
    return result;
}


// Function to get mahasiswa by nim
function getMahasiswaByNim(nim) {
    const result = data.data.filter((mahasiswa) => mahasiswa.nim === nim);
    return result;
}

module.exports = {
    getAllMahasiswa,
    getMahasiswaByNim,
};
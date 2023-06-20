const data = require('./data.json');
const fs = require('fs');
const axios = require('axios')

// const getAllUser = () => {
//     return data;
// }

function getAllUser(payload) {
    let result = data;
    if(payload.name) {
        result = data.data.filter(field => field.name == payload.name)
    }
    return result;
}

function getUserById(id) {
    const result = data.data.filter(field => field.id == id)

    return result;
}

function insertNewData(payload) {
    data.data.push(payload)
    fs.writeFileSync('data.json', JSON.stringify(data));
    return data;
}

function updateData(id, payload) {

    for(let i = 0; i < data.data.length; i += 1) {
        if(data.data[i].id == id) {
            data.data[i].name = payload.name;
            data.data[i].nim = payload.nim
        }
    }
    fs.writeFileSync('data.json', JSON.stringify(data));
    return data;
}

function deleteData(id) {
    // const idx = data.data.findIndex(field => field.id == id);
    // data.data.splice(idx,1)

    const data = axios.get('http://midtrans........')
    
    fs.writeFileSync('./data.json', JSON.stringify(data))
    return data;
}

module.exports = {
    getAllUser,
    getUserById,
    insertNewData,
    updateData,
    deleteData,
}
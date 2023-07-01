const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataMahasiswa = require('./data-mahasiswa.json');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/profile', (req, res) => {
    const profile = {
        nama: 'Nama Mahasiswa',
        nim: 'NIM Mahasiswa'
    };
    res.render('profile', profile);
});

app.get('/list-mahasiswa', (req, res) => {
    res.render('list-mahasiswa', { mahasiswa: dataMahasiswa });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

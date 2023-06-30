const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/profile', (req, res) => {
    const nama = 'John Doe';
    const nim = '1234567890';
    res.render('profile', { nama, nim });
});

app.get('/listMahasiswa', (req, res) => {
    const mahasiswas = require('./data.json');
    res.render('listMahasiswa', { mahasiswas });
});

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const path = require("path");
const mahasiswaData = require("./mahasiswa.json");

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ejs",
  port: 3000,
});

// Menggunakan EJS sebagai view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Mengatur bodyParser untuk membaca data dari form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Menghubungkan ke database MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database");
    return;
  }
  console.log("Connected to database");
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// Routing untuk halaman profile
app.get("/profile", (req, res) => {
  const data = {
    nama: "Bimo Adji Kusnadi",
    nim: "V3922010",
  };
  res.render("profile", data);
});

// Routing untuk halaman list mahasiswa
app.get("/list_mahasiswa", (req, res) => {
  res.render("list_mahasiswa", { mahasiswa: mahasiswaData });
});

// Untuk membuat API CRUD
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// API Read: Get All
app.get("/api/mahasiswa", (req, res) => {
  const query = "SELECT * FROM mahasiswa";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// API Read: Get One
app.get("/api/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM mahasiswa WHERE id = ${id}`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.sendStatus(404);
    }
  });
});

// API Create
app.post("/api/mahasiswa", (req, res) => {
  const { nama, nim } = req.body;
  const query = `INSERT INTO mahasiswa (nama, nim) VALUES ('${nama}', '${nim}')`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.sendStatus(201);
  });
});

// API Update
app.put("/api/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const { nama, nim } = req.body;
  const query = `UPDATE mahasiswa SET nama = '${nama}', nim = '${nim}' WHERE id = ${id}`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// API Delete
app.delete("/api/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM mahasiswa WHERE id = ${id}`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// Server berjalan di port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

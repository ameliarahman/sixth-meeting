const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const mahasiswa = require("./mahasiswa");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route untuk halaman utama
app.get("/", (req, res) => {
  res.render("index");
});

// Route untuk menampilkan halaman profile
// Routing untuk halaman profile
app.get("/profile", (req, res) => {
  const mahasiswa = {
    id: "V3922032",
    nama: "Muhammad Abidin",
    nim: "V3922032",
    address: "Madiun"
  };
  res.render("profile", { mahasiswa: mahasiswa });
});


// Route untuk menampilkan halaman list mahasiswa
app.get("/mahasiswa", (req, res) => {
  const allMahasiswa = mahasiswa.getAllMahasiswa();
  res.render("list-mahasiswa", { mahasiswa: allMahasiswa });
});

// Route untuk hapus data mahasiswa
app.delete("/mahasiswa/delete/:id", (req, res) => {
  const id = req.params.id;
  mahasiswa.deleteMahasiswa(id);
  res.redirect("/mahasiswa");
});

// Route untuk update data mahasiswa
app.put("/mahasiswa/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedMahasiswa = {
    id: id,
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address,
  };
  mahasiswa.updateMahasiswa(updatedMahasiswa);
  res.redirect("/mahasiswa");
});

// Route untuk tambah data mahasiswa
app.post("/mahasiswa/insert", (req, res) => {
  const newMahasiswa = {
    id: req.body.id,
    name: req.body.name,
    nim: req.body.nim,
    address: req.body.address,
  };
  mahasiswa.insertMahasiswa(newMahasiswa);
  res.redirect("/mahasiswa");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
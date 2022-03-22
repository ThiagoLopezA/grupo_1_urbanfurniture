const express = require("express");
const app = express();
const path = require("path");

// <-- Levantando el Servidor -->
app.listen(3030, () =>
  console.log("Servidor levantado con exito en el puerto 3030")
);

// <-- Definiendo la carpeta estatica -->
app.use(express.static("public"));

// <-- Rutas -->
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/main.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/contact.html"));
});
app.get("/login", (req,res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"))
})
app.get("/productCart", (req,res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"))
})

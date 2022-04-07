const express = require("express");
const app = express();
const path = require("path");

// <-- Levantando el Servidor -->
app.listen(3030, () =>
  console.log("Servidor levantado con exito en el puerto 3030")
);

// <-- Definiendo la carpeta estatica -->
app.use(express.static("public"));

// Motor de Plantilla EJS
app.set("view engine", "ejs");

// <-- Rutas -->
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/main.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/contact.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/login.html"));
});
app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/productCart.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/register.html"));
});
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/views/product.html"));
});

const express = require("express");
const app = express();
const path = require("path");

const rutaHome = require("./routes/main.js");
const userRoutes = require("./routes/userRoutes.js");
const rutaProduct = require("./routes/productRoutes.js");
const adminRoutes = require("./routes/adminRoutes");

// <-- Levantando el Servidor -->
app.listen(3030, () =>
  console.log("Servidor levantado con exito en el puerto 3030")
);

// <-- Definiendo la carpeta estatica -->
// app.use(express.static(path.join(__dirname, "../public")));
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/img", express.static(path.join(__dirname, "../public/img")));

// Motor de Plantilla EJS

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set("views engine", "ejs");

// <-- Rutas -->
app.use("/", rutaHome);
app.use("/users", userRoutes);
app.use("/product", rutaProduct);
app.use("/admin", adminRoutes);

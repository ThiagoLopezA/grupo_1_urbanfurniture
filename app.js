const express = require("express");
const app = express();
const path = require("path");
const rutaHome = require ('./src/routes/main.js');
const userRoutes = require ('./src/routes/userRoutes');


// <-- Levantando el Servidor -->
app.listen(3030, () =>
  console.log("Servidor levantado con exito en el puerto 3030")
);

// <-- Definiendo la carpeta estatica -->
app.use(express.static("public"));

// Motor de Plantilla EJS

app.set("view engine", 'ejs');
app.set('views', __dirname + '/src/views');



// <-- Rutas -->
app.use('/', rutaHome);
app.use('/users', userRoutes);


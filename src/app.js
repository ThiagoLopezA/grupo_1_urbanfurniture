const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")

const rutaHome = require("./routes/main.js");
const userRoutes = require("./routes/userRoutes.js");
const rutaProduct = require("./routes/productRoutes.js");
const adminRoutes = require("./routes/adminRoutes");

app.use(session({
  secret: "Frase secreta",
  resave: false,
  saveUninitialized: false 
}));


// <-- Definiendo la carpeta estatica -->
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/img", express.static(path.join(__dirname, "../public/img")));

// <-- Levantando el Servidor -->
app.listen(3030, () =>
console.log("Servidor levantado con exito en el puerto 3030")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(userLoggedMiddleware);

// Motor de Plantilla EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// <-- Rutas -->
app.use("/", rutaHome);
app.use("/users", userRoutes);
app.use("/product", rutaProduct);
app.use("/admin", adminRoutes);

const express = require("express");
const path = require("path");
const app = express();
const port = 3001;

app.listen(port, () => console.log("Server up in 3001"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);

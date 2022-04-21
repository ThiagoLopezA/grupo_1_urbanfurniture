const products = require("./productController");

const adminController = {
  index: (req, res) => {
    res.render("adm-dashboard/index.ejs");
  },
  modificarProducto: (req, res) => {
    let database = products.getProducts();
    res.render("adm-dashboard/modificarProducto.ejs", { data: database });
  },
  agregarProducto: (req, res) => {
    res.render("adm-dashboard/agregarProducto.ejs");
  },
  usuarios: (req, res) => {
    res.render("adm-dashboard/usuarios.ejs");
  },
};

module.exports = adminController;

const products = require("./productController");

const adminController = {
  index: (req, res) => {
    let database = products.getProducts();
    res.render("adm-dashboard/index.ejs", { database: database });
  },
  modificarProducto: (req, res) => {
    let database = products.getProducts();
    res.render("adm-dashboard/modificarProducto.ejs", { data: database });
  },
  agregarProducto: (req, res) => {
    res.render("adm-dashboard/agregarProducto.ejs");
  },
  search: (req, res) => {
    let database = products.getProducts();
    let search = req.query.keywords.toLowerCase();
    let results = database.filter(product =>
      product.name.toLowerCase().includes(search)
    );
    res.render("adm-dashboard/modificarProducto", { data: results });
  },
  usuarios: (req, res) => {
    res.render("adm-dashboard/usuarios.ejs");
  },
};

module.exports = adminController;

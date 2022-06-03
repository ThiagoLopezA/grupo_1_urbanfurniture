const { redirect } = require("express/lib/response");
const products = require("./productController");

const adminController = {
  index: (req, res) => {
    res.render("adm-dashboard/index.ejs", { url: req.url });
  },
  products: (req, res) => {
    let database = products.getProducts();
    let categories = [];
    database.forEach(e => {
      if (!categories.includes(e.category)) {
        categories.push(e.category);
      }
    });
    res.render("adm-dashboard/products.ejs", {
      url: req.url,
      products: database,
      categories: categories,
    });
  },
  searchProducts: (req, res) => {
    res.redirect("/admin/products", { url: req.url });
  },
  users: (req, res) => {
    res.render("adm-dashboard/users.ejs", { url: req.url });
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

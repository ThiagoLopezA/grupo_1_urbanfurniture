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
  editProducts: (req, res) => {
    let database = products.getProducts();
    let product = database.find(p => (p.id = req.params.id));
    res.render("adm-dashboard/editProduct.ejs", { product, url: req.url });
  },
  users: (req, res) => {
    res.render("adm-dashboard/users.ejs", { url: req.url });
  },

  modificarProducto: (req, res) => {
    let database = products.getProducts();
    res.render("adm-dashboard/modificarProducto.ejs", { data: database });
  },
};

module.exports = adminController;

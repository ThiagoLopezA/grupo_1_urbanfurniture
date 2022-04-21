const products = require("./productController");

const otherController = {
  main: (req, res) => {
    let database = products.getProducts();
    res.render("others/main", { data: database });
  },
  contact: (req, res) => {
    res.render("others/contact");
  },
};

module.exports = otherController;

const products = require("./productController");

const otherController = {
  main: (req, res) => {
    let database = products.getProducts();
    let fragmentData = database.slice(0, 4);
    res.render("others/main", { data: fragmentData });
  },
  contact: (req, res) => {
    res.render("others/contact");
  },
};

module.exports = otherController;

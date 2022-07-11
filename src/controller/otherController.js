const fetch = require("node-fetch");
const { APIURL } = require("../config");

module.exports = {
  main: (req, res) => {
    fetch(`${APIURL}/products/4`)
      .then(response => response.json())
      .then(products =>
        res.render("others/main", { products: products.products })
      )
      .catch(error => console.log(error));
  },
  contact: (req, res) => {
    res.render("others/contact");
  },
};

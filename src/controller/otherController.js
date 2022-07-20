const fetch = require("node-fetch");
const { APIURL } = require("../config");

module.exports = {
  main: async (req, res) => {
    try {
      let latestProducts = await fetch(
        `${APIURL}/products/order/idproducts/DESC/4`
      ).then(response => response.json());
      let inSaleProducts = await fetch(`${APIURL}/products/inSale/4`).then(
        response => response.json()
      );
      res.render("others/main", {
        latestProducts: latestProducts.products,
        inSaleProducts: inSaleProducts.products,
      });
    } catch (e) {
      console.log(e);
    }
  },
  contact: (req, res) => {
    res.render("others/contactPrototype");
  },
};

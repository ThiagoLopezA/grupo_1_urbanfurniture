const fetch = require("node-fetch");
const { APIURL } = require("../config");

module.exports = {
  productCart: (req, res) => {
    console.log(req.session.cart)
    let productData = [
      {
        src: "../img/products/product-3.png",
        precioAnt: 30785,
        precio: 27690,
        nombre: "Silla Bulgaria",
      },
      {
        src: "../img/products/product-2.png",
        precioAnt: 30785,
        precio: 27690,
        nombre: "Silla Ferragamo",
      },
    ];
    res.render("product/productCart", { data: productData });
  },
  detail: async (req, res) => {
    try {
      let product = await fetch(
        `${APIURL}/products/detail/${req.params.id}`
      ).then(response => response.json());
      let productsRelated = await fetch(
        `${APIURL}/products/category/${product.idcategory}/4`
      ).then(response => response.json());
      console.log(req.session.userLogged)
      let ableToAdd = false; 
      if(req.session.userLogged){
        ableToAdd = true;
      }
      res.render("product/detail", {
        product,
        productsRelated: productsRelated.products,
        ableToAdd
      });
    } catch (e) {
      console.log(e);
    }
  },
  listAll: (req, res) => {
    fetch(`${APIURL}/products`)
      .then(response => response.json())
      .then(products => {
        res.render("product/products", {
          data: products.products,
          filtro: "Todos los productos",
          categories: products.categories,
        });
      });
  },
  listCategory: (req, res) => {
    fetch(`${APIURL}/products/category/${req.params.category}`)
      .then(response => response.json())
      .then(products => {
        res.render("product/products", {
          data: products.products,
          filtro: products.category,
          categories: products.categories,
        });
      })
      .catch(e => console.log(e));
  },

  listBySearch: (req, res) => {
    fetch(`${APIURL}/products/search/${req.query.keywords}`)
      .then(response => response.json())
      .then(products => {
        res.render("product/products", {
          data: products.products,
          filtro: "Todos los productos",
          categories: products.categories,
        });
      });
  },

  addToCart: (req, res) => {
    fetch(`${APIURL}/products/detail/${req.params.id}`)
      .then(response => response.json())
      .then(product => {
        product.quantity = 0;
        product.totalPrice = product.finalPrice || product.price;
        if(req.session && req.session.cart){
          let pos = req.session.cart.indexOf(product);
          if(pos != -1){
            req.session.cart[pos].quantity += 1;
            req.session.cart[pos].totalPrice += product.price;
          } else {
            req.session.cart.push(product);
          }
        } else {
          req.session.cart = [];
          req.session.cart.push(product);
        }
        res.redirect(`/product/detail/${product.id}`);
      })
      .catch(e => console.log(e))
  }
};

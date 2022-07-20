const { validationResult } = require("express-validator");
const fetch = require("node-fetch");
const { APIURL } = require("../config");

module.exports = {
  index: async (req, res) => {
    try {
      let products = await fetch(
        `${APIURL}/products/order/idproducts/DESC/10`
      ).then(response => response.json());
      let users = await fetch(`${APIURL}/users`).then(response =>
        response.json()
      );
      let allProducts = await fetch(`${APIURL}/products`).then(response =>
        response.json()
      );
      res.render("adm-dashboard/index", {
        url: req.url,
        products: products.products,
        users: users.users.length,
        productsQuantity: allProducts.products.length,
      });
    } catch (e) {
      console.log(e);
    }
  },
  products: async (req, res) => {
    try {
      let products = await fetch(
        `${APIURL}/products/order/idproducts/DESC`
      ).then(response => response.json());
      let categories = await fetch(`${APIURL}/products/categories/list`).then(
        response => response.json()
      );
      let inSale = await fetch(`${APIURL}/products/inSale`).then(response =>
        response.json()
      );
      res.render("adm-dashboard/products.ejs", {
        url: req.url,
        products: products.products,
        categories: categories.categories,
        inSaleQuantity: inSale.products.length,
      });
    } catch (e) {
      console.log(e);
    }
  },
  searchProducts: async (req, res) => {
    try {
      let url = "";
      if (req.query.keywords != "") {
        url =
          req.query.order != ""
            ? `${APIURL}/products/search/${req.query.keywords}/${req.query.order}/ASC`
            : `${APIURL}/products/search/${req.query.keywords}`;
      } else {
        url =
          req.query.order != ""
            ? `${APIURL}/products/order/${req.query.order}/ASC`
            : `${APIURL}/products`;
      }
      let products = await fetch(url).then(response => response.json());
      let categories = await fetch(`${APIURL}/products/categories/list`).then(
        response => response.json()
      );
      res.render("adm-dashboard/products.ejs", {
        url: req.url,
        products: products.products,
        categories: categories.categories,
      });
    } catch (e) {
      console.log(e);
    }
  },
  createProduct: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.redirect("/admin/products");
    } else {
      if (req.file != undefined) {
        req.body.image = req.file.filename;
      } else {
        req.body.image = "Empty";
      }
      fetch(`${APIURL}/products/create`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-type": "application/json" },
      })
        .then(() => {
          res.redirect("/admin/products");
        })
        .catch(e => console.log(e));
    }
  },
  editProduct: async (req, res) => {
    try {
      let product = await fetch(
        `${APIURL}/products/detail/${req.params.id}`
      ).then(response => response.json());
      let categories = await fetch(`${APIURL}/products/categories/list`).then(
        response => response.json()
      );
      res.render("adm-dashboard/editProduct", {
        product,
        url: req.url,
        categories: categories.categories,
      });
    } catch (e) {
      console.log(e);
    }
  },
  updateProduct: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.redirect("/admin/products");
    } else {
      if (req.file != undefined) {
        req.body.image = req.file.filename;
      } else {
        delete req.body.image;
      }
      fetch(`${APIURL}/products/update/${req.params.id}`, {
        method: "PUT",
        body: JSON.stringify(req.body),
        headers: { "Content-type": "application/json" },
      })
        .then(() => res.redirect("/admin/products"))
        .catch(e => console.log(e));
    }
  },
  confirmDeleteProduct: (req, res) => {
    fetch(`${APIURL}/products/detail/${req.params.id}`)
      .then(response => response.json())
      .then(product => {
        res.render("./adm-dashboard/confirmDelete", { url: req.url, product });
      })
      .catch(e => console.log(e));
  },
  deleteProduct: (req, res) => {
    fetch(`${APIURL}/products/delete/${req.params.id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => res.redirect("/admin/products"))
      .catch(e => console.log(e));
  },
  users: async (req, res) => {
    try {
      let request = await fetch(`${APIURL}/users`).then(response =>
        response.json()
      );
      let users = request.users;
      let usersAdmin = users.filter(user => user.access == 1);
      let usersClient = users.length - usersAdmin.length;
      res.render("adm-dashboard/users.ejs", {
        url: req.url,
        users: users,
        usersCount: users.length,
        adminCount: usersAdmin.length,
        clientsCount: usersClient,
      });
    } catch (e) {
      console.log(e);
    }
  },
  editUser: (req, res) => {
    fetch(`${APIURL}/users/${req.params.id}`)
      .then(response => response.json())
      .then(user => {
        res.render("adm-dashboard/editUser.ejs", {
          url: req.url,
          user: user.user,
        });
      })
      .catch(e => console.log(e));
  },
  updateUser: (req, res) => {
    fetch(`${APIURL}/users/update/${req.params.id}`, {
      method: "PUT",
      body: JSON.stringify(req.body),
      headers: { "Content-type": "application/json" },
    })
      .then(() => res.redirect("/admin/users"))
      .catch(e => console.log(e));
  },
  confirmDeleteUser: (req, res) => {
    fetch(`${APIURL}/users/${req.params.id}`)
      .then(response => response.json())
      .then(user => {
        res.render("./adm-dashboard/confirmDeleteUser", {
          url: req.url,
          user: user.user,
        });
      })
      .catch(e => console.log(e));
  },
  destroyUser: (req, res) => {
    fetch(`${APIURL}/users/delete/${req.params.id}`, {
      method: "DELETE",
    })
      .then(() => {
        res.redirect("/admin/users");
      })
      .catch(e => console.log(e));
  },
};

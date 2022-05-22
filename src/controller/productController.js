const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {
  getProducts: () => {
    let data = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    data.forEach(product => {
      if (product.discount != 0 && !product.hasOwnProperty("finalPrice")) {
        product.finalPrice =
          product.price - (product.discount * product.price) / 100;
        // Calcula cuanto vale el descuento y se lo resta al precio original
        product.finalPrice = toThousand(product.finalPrice); // Por medio de regex de JS aplica "." donde sean necesarios
      }
      product.price = toThousand(product.price);
    });
    return data;
  },
  getCategories: () => {
    let data = productController.getProducts();
    let categoryList = {};
    data.forEach(product => {
      if (!categoryList.hasOwnProperty(product.category)) {
        categoryList[product.category] = 1;
      } else {
        categoryList[product.category]++;
      }
    });
    return categoryList;
  },
  productCart: (req, res) => {
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
  detail: (req, res) => {
    let data = productController.getProducts();
    let product = data.find(product => product.id == req.params.id);
    let sameCategory = data.filter(p => p.category == product.category);
    res.render("product/detail", {
      product: product,
      suggestions: sameCategory,
    });
  },
  listAll: (req, res) => {
    let data = productController.getProducts();
    let categoryList = productController.getCategories();
    res.render("product/products", {
      data: data,
      filtro: "Todos los productos",
      categories: categoryList,
    });
  },
  listCategory: (req, res) => {
    let data = productController.getProducts();
    let byCategory = data.filter(
      product => product.category == req.params.category
    );
    let categoryList = productController.getCategories();
    res.render("product/products", {
      data: byCategory,
      filtro: req.params.category,
      categories: categoryList,
    });
  },
  listBySearch: (req, res) => {
    let data = productController.getProducts();
    if (!req.query.keywords == 0) {
      data = data.filter(product =>
        product.name.toLowerCase().includes(req.query.keywords.toLowerCase())
      );
    }
    let categoryList = productController.getCategories();
    res.render("product/products", {
      data: data,
      filtro: req.query.keywords,
      categories: categoryList,
    });
  },
  crear: (req, res) => {
    let data = productController.getProducts();
    let nuevoProducto = {};
    for (let prop in req.body) {
      if (prop != "image") {
        //push de una propiedad de objetos
        nuevoProducto[prop] = req.body[prop];
      }
    }
    if (req.file != undefined) {
      //push de la propiedad imagen del objeto
      nuevoProducto.image = req.file.filename;
    }
    let temp = [];
    data.forEach(product => temp.push(parseInt(product.id)));
    nuevoProducto.id = parseInt(Math.max(...temp)) + 1;
    nuevoProducto.price = parseInt(nuevoProducto.price);
    data.push(nuevoProducto);
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, " "));
    res.redirect("/product");
  },
  edit: (req, res) => {
    let data = productController.getProducts();
    let product = data.find(product => product.id == req.params.id);
    res.render("adm-dashboard/modificarForm", { product: product });
  },
  update: (req, res) => {
    let data = productController.getProducts();
    let product = data.find(product => product.id == req.params.id);
    let pos = data.indexOf(product);

    for (let prop in req.body) {
      if (req.body[prop] != "" && req.body[prop] != "image") {
        product[prop] = req.body[prop];
      }
    }
    if (req.file != undefined) {
      product.image = req.file.filename;
    }
    data[pos] = product;
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 4));
    res.redirect("/product");
  },
  delete: (req, res) => {
    let data = productController.getProducts();
    data = data.filter(product => product.id != req.params.id);
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 4));
    res.redirect("/admin");
  },
};

module.exports = productController;

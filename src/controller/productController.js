const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {
  getProducts: () => {
    let data = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    data.forEach(product => {
      if (product.discount != 0) {
        product.finalPrice =
          product.price - (product.discount * product.price) / 100;
        // Calcula cuanto vale el descuento y se lo resta al precio original
        product.finalPrice = toThousand(product.finalPrice); // Por medio de regex de JS aplica "." donde sean necesarios
      }
      product.price = toThousand(product.price);
    });
    return data;
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
    res.render("product/detail", { product: product });
  },
  list: (req, res) => {
    let data = productController.getProducts();
    res.render("product/products", { data: data });
  },
  crear: (req, res) => {
    let data = productController.getProducts();
    let nuevoProducto = {};
    for (let prop in req.body) {
      if (prop != 'image') {
        //push de una propiedad de objetos
        nuevoProducto[prop] = req.body[prop];
      }
    }
    if (req.file != undefined) {
      //push de la propiedad imagen del objeto
      nuevoProducto.image = req.file.filename;
    }
    let temp = [];
    data.forEach(product=>temp.push(parseInt(product.id)));
    nuevoProducto.id = parseInt(Math.max(...temp))+1;
    nuevoProducto.price = parseInt(nuevoProducto.price);

    data.push(nuevoProducto);
     console.log(temp);
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, " "));
    res.redirect('/product')
  },

  /*
  // Enviar vista de modificar producto
  edit: (req, res) => {
    let data = productController.getProducts();
    let idProduct = req.params.id;
    let product = data.find(product => product.id == idProduct);
    res.render("adm-dashboard/modificarForm", { product: product });
  },
  // Modificar producto
  update: (req, res) => {
    let data = productController.getProducts();
    let idProduct = req.params.id;
    let product = data.find(product => product.id == idProduct);
    product.name = req.body.name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.category = req.body.category;
    product.description = req.body.description;
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 4));
    res.redirect("product/products");
  },
  // Eliminar producto
  destroy: (req, res) => {
    let data = productController.getProducts();
    data = data.filter(product => product.id != req.params.id);
    for (let i = req.params.id - 1; i < products.length; i++) {
      products[i].id = products[i].id - 1;
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 4));
    res.redirect('/products');

  }
*/
};

module.exports = productController;

const cartController = {
    productCart: (req, res) => {
        let productData = [
            {
              src : "../img/products2.png",
              precioAnt : 30785,
              precio : 27690,
              nombre : "Silla Bulgaria"
            },
            {
              src : "../img/fav-icon.png",
              precioAnt : 30785,
              precio : 27690,
              nombre : "Silla Ferragamo"
            },
       
          ]
        res.render('product/productCart', {data: productData});
    },
    
}

module.exports = cartController;
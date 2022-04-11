const adminController = {
    index : (req, res) => {
        res.render("adm-dashboard/index.ejs");
    },
    modificarProducto : (req, res) => {
        let productData = [
            {
              src : "../img/products2.png",
              precioAnt : 12500,
              precio : 10000,
              desc : "Estante"
            },
            {
              src : "../img/products3.png",
              precioAnt : 12000,
              precio : 10000,
              desc : "Mesa"
            },
            {
              src : "../img/products4.png",
              precioAnt : 13000,
              precio : 10000,
              desc : "Mueble con cajones"
            },
            {
              src : "../img/products5.png",
              precioAnt : 12500,
              precio : 10000,
              desc : "Mesa y juego de sillas"
            },
          ]
        res.render("adm-dashboard/modificarProducto.ejs", {data: productData});
    },
    agregarProducto : (req, res) => {
        res.render("adm-dashboard/agregarProducto.ejs");
    },
    usuarios : (req, res) => {
        res.render("adm-dashboard/usuarios.ejs")
    }
}

module.exports = adminController;
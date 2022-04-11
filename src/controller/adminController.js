const adminController = {
    index : (req, res) => {
        res.render("adm-dashboard/index.ejs");
    },
    modificarProducto : (req, res) => {
        res.render("adm-dashboard/modificar.ejs");
    },
    agregarProducto : (req, res) => {
        res.render("adm-dashboard/agregar.ejs");
    },
    usuarios : (req, res) => {
        res.render("adm-dashboard/usuarios.ejs")
    }
}

module.exports = adminController;
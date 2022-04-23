const fs = require("fs");
const path = require("path");
const userFilePath = path.join(__dirname, "../data/user.json");

const userController = {
  getdatos: () => {return JSON.parse(fs.readFileSync(userFilePath, 'utf-8'))},

  login: (req, res) => {
    res.render("users/login");
  },
  register: (req, res) => {
    res.render("users/register");
  },
  dataRegister: (req, res) =>{ 
    let datos = userController.getdatos();
    let response = datos.filter(user => user.email == req.body.email );
    if (response.length == 0){
      console.log (req.body)
      fs.writeFileSync(userFilePath, JSON.stringify(datos, null, " "));
      res.redirect('/')
    }else{
    alert('El correo esta Registrado')
    res.redirect('/register')
    }
    console.log (datos),
    res.redirect('/users/login')
  }
};



module.exports = userController;

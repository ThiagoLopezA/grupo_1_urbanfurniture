const fs = require("fs");
const path = require("path");

const User = {
  fileName: path.join(__dirname, "../data/user.json"),
  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },
  findAll: function () {
    return this.getData();
  },
  findByField: function (field, text) {
    let allUsers = this.findAll();
    let userFound = allUsers.find(user => user[field] === text);
    return userFound;
  },
  create: function (userData) {
    let allUsers = this.findAll();
    allUsers.push(userData);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
  },
  delete: function (user) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter(usuario => usuario.user !== user);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
    return true;
  },
};

module.exports = User;

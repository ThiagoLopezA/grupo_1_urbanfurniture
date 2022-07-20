const API_URL = "http://localhost:3001/api";

const getProductById = async id => {
  return await fetch(`${API_URL}/products/detail/${id.innerText}`)
    .then(response => response.json())
    .catch(e => console.log("error en la funcion: " + e));
};

window.addEventListener("load", () => {
  let button = document.querySelector(".detail__button");
  let id = document.querySelector(".product__id");
  console.log(id.innerText);
  button.addEventListener("click", e => {
    getProductById(id)
      .then(response => {
        let product = response;
        delete product.status;
        product.quantity = 1;
        product.totalPrice = product.finalPrice || product.price;

        if (!localStorage.getItem("cart")) {
          localStorage.setItem("cart", "[]");
          let cart = JSON.parse(localStorage.getItem("cart"));
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let cart = JSON.parse(localStorage.getItem("cart"));
          if (cart.length == 0) {
            cart.push(product);
          } else {
            let productInCart = cart.find(element => element.id == product.id);
            let productInCartPos = cart.indexOf(productInCart);
            if (productInCart === undefined) {
              cart.push(product);
            } else {
              cart[productInCartPos].quantity += 1;
              cart[productInCartPos].totalPrice += product.totalPrice;
            }
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      })
      .catch(e => console.log(e));
  });
});

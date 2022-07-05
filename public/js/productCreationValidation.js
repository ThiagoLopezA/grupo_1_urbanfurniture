window.addEventListener("load", () => {
  // Form
  let formAgregar = document.querySelector("#formAgregar");
  // Inputs
  let name = document.querySelector("#name");
  let price = document.querySelector("#price");
  let discount = document.querySelector("#discount");
  let description = document.querySelector("#description");
  let categories = document.querySelector("#categories");
  // Etiquetas de error
  let errorName = document.querySelector(".text-danger.name");
  let errorPrecio = document.querySelector(".text-danger.price");
  let errorDiscount = document.querySelector(".text-danger.discount");
  let errorDescription = document.querySelector(".text-danger.description");
  let errorCategories = document.querySelector(".text-danger.categories");

  function preventDefault(event, element, message) {
    if (!event.target.value.length > 0) {
      element.innerText = message;
    } else {
      element.innerText = "";
    }
  }
  function preventNumber(event, element, message) {
    if (!event.target.value.length > 0) {
      element.innerText = "No puede estar vacio este campo";
    } else if (event.target.value < 0) {
      element.innerText = message;
    } else {
      element.innerText = "";
    }
  }
  function isEmpty(input) {
    if (input.value == "") {
      return 1;
    } else {
      return 0;
    }
  }

  name.addEventListener("blur", e => {
    preventDefault(e, errorName, "No puede estar vacio este campo");
  });
  price.addEventListener("blur", e => {
    preventNumber(e, errorPrecio, "Precio invalido");
  });
  discount.addEventListener("blur", e => {
    preventNumber(e, errorDiscount, "Descuento invalido");
  });
  description.addEventListener("blur", e => {
    preventDefault(e, errorDescription, "No puede estar vacio este campo");
  });
  categories.addEventListener("blur", e => {
    preventDefault(e, errorCategories, "Seleccione una categoria");
  });

  formAgregar.addEventListener("submit", e => {
    e.preventDefault();
    let errors = {};

    if (isEmpty(name)) {
      errors.name = "No puede estar vacio este campo";
    }
    if (isEmpty(price)) {
      errors.price = "No puede estar vacio este campo";
    }
    if (isEmpty(discount)) {
      errors.discount = "No puede estar vacio este campo";
    }
    if (isEmpty(description)) {
      errors.description = "No puede estar vacio este campo";
    }
    if (isEmpty(categories)) {
      errors.categories = "No puede estar vacio este campo";
    }

    if (Object.keys(errors).length >= 1) {
      if (errors.name) {
        errorName.innerText = errors.name;
      }
      if (errors.price) {
        errorPrecio.innerText = errors.price;
      }
      if (errors.discount) {
        errorDiscount.innerText = errors.discount;
      }
      if (errors.description) {
        errorDescription.innerText = errors.description;
      }
      if (errors.categories) {
        errorCategories.innerText = errors.categories;
      }
    } else {
      formAgregar.submit();
    }
  });
});

function preventDefault(input, errorTag) {
  if (input.value == "") {
    errorTag.innerText = "No puede estar vacio este campo";
  } else {
    errorTag.innerText = "";
  }
}
function isEmpty(input) {
  if (input.value == "") {
    return 1;
  } else {
    return 0;
  }
}

window.addEventListener("load", function () {
  // Formulario
  let formulario = document.querySelector("form");
  // Inputs
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  // Etiquetas de error
  let errorEmail = document.querySelector(".text-danger.email");
  let errorPass = document.querySelector(".text-danger.pass");

  // Validacion de email

  email.addEventListener("blur", e => {
    preventDefault(email, errorEmail);
  });

  // Validacion de password
  password.addEventListener("blur", e => {
    preventDefault(email, errorPass);
  });

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let errors = {};
    if (isEmpty(email)) {
      errors.email = "No puede estar vacio este campo";
    }
    if (isEmpty(password)) {
      errors.password = "No puede estar vacio este campo";
    }

    if (Object.keys(errors).length >= 1) {
      if (errors.email) {
        errorEmail.innerText = errors.email;
      }
      if (errors.password) {
        errorPass.innerText = errors.password;
      }
    } else {
      formulario.submit();
    }
  });
});

window.addEventListener("load", function () {
  // Formulario
  let registerForm = document.querySelector("#form");

  // Inputs
  let firstNameInput = document.querySelector("#firstName");
  let lastNameInput = document.querySelector("#lastName");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let passConfirmInput = document.querySelector("#passwordConfirm");

  // Etiquetas html con errores de formulario
  let erroresFirstName = document.querySelector(".first-name .text-danger");
  let erroresLastName = document.querySelector(".last-name .text-danger");
  let erroresEmail = document.querySelector(".email .text-danger");
  let erroresPass = document.querySelector(".password .text-danger");
  let erroresPassConfirm = document.querySelector(".pass-confirm .text-danger");

  // Mensajes de Error
  let campoIncompleto = "Se debe completar este campo";
  let longitudNombre = "Debe tener al menos 2 caracteres";
  let longitudPassword = "La contraseña debe tener al menos 8 caracteres";
  let strongPass =
    "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos caracteres especiales !@#$%^&*";
  let emailValido = "Debes ingresar un email con formato válido";
  let passNoCoincide = "Las contraseñas no coinciden";

  // Regex para la validación del email y la password
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  // Validaciones para el nombre
  firstNameInput.addEventListener("blur", () => {
    if (firstNameInput.value == "") {
      erroresFirstName.innerHTML = campoIncompleto;
    }
  });
  firstNameInput.addEventListener("input", () => {
    if (firstNameInput.value == "") {
      erroresFirstName.innerHTML = campoIncompleto;
    } else if (firstNameInput.value.length < 2) {
      erroresFirstName.innerHTML = longitudNombre;
    } else {
      erroresFirstName.innerHTML = "";
    }
  });

  // Validaciones para el apellido
  lastNameInput.addEventListener("blur", () => {
    if (lastNameInput.value == "") {
      erroresLastName.innerHTML = campoIncompleto;
    }
  });
  lastNameInput.addEventListener("input", () => {
    if (lastNameInput.value == "") {
      erroresLastName.innerHTML = campoIncompleto;
    } else if (lastNameInput.value.length < 2) {
      erroresLastName.innerHTML = longitudNombre;
    } else {
      erroresLastName.innerHTML = "";
    }
  });

  // Validaciones para el email
  emailInput.addEventListener("blur", () => {
    if (emailInput.value == "") {
      erroresEmail.innerHTML = campoIncompleto;
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.value == "") {
      erroresEmail.innerHTML = campoIncompleto;
    } else if (!emailRegex.test(emailInput.value)) {
      erroresEmail.innerHTML = emailValido;
    } else {
      erroresEmail.innerHTML = "";
    }
  });

  // Validaciones para la contraseña
  passwordInput.addEventListener("blur", () => {
    if (passwordInput.value == "") {
      erroresPass.innerHTML = campoIncompleto;
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value == "") {
      erroresPass.innerHTML = campoIncompleto;
    } else if (passwordInput.value.length < 8) {
      erroresPass.innerHTML = longitudPassword;
    } else if (!strongRegex.test(passwordInput.value)) {
      erroresPass.innerHTML = strongPass;
    } else if (passwordInput.value != passConfirmInput.value) {
      erroresPass.innerHTML = "";
      erroresPassConfirm.innerHTML = passNoCoincide;
    } else if (passwordInput.value == passConfirmInput.value) {
      erroresPass.innerHTML = "";
      erroresPassConfirm.innerHTML = "";
    } else {
      erroresPass.innerHTML = "";
    }
  });

  // Validaciones para la confirmación de la contraseña
  passConfirmInput.addEventListener("blur", () => {
    if (passConfirmInput.value == "") {
      erroresPassConfirm.innerHTML = campoIncompleto;
    }
  });

  passConfirmInput.addEventListener("input", () => {
    if (passConfirmInput.value == "") {
      erroresPassConfirm.innerHTML = campoIncompleto;
    } else if (passConfirmInput.value.length < 8) {
      erroresPassConfirm.innerHTML = longitudPassword;
    } else if (!strongRegex.test(passConfirmInput.value)) {
      erroresPassConfirm.innerHTML = strongPass;
    } else if (passConfirmInput.value != passwordInput.value) {
      erroresPassConfirm.innerHTML = passNoCoincide;
    } else {
      erroresPassConfirm.innerHTML = "";
    }
  });

  // Validaciones onSubmit

  registerForm.addEventListener("submit", event => {
    event.preventDefault();

    let errores = {};

    if (firstNameInput.value == "") {
      errores.firstName = campoIncompleto;
    } else if (firstNameInput.value.length < 2) {
      errores.firstName = longitudNombre;
    }

    if (lastNameInput.value == "") {
      errores.lastName = campoIncompleto;
    } else if (lastNameInput.value.length < 2) {
      errores.lastName = longitudNombre;
    }

    if (emailInput.value == "") {
      errores.email = campoIncompleto;
    } else if (!emailRegex.test(emailInput.value)) {
      errores.email = emailValido;
    }

    if (passwordInput.value == "") {
      errores.password = campoIncompleto;
    } else if (passwordInput.value.length < 8) {
      errores.password = longitudPassword;
    } else if (!strongRegex.test(passwordInput.value)) {
      errores.password = strongPass;
    }

    if (passConfirmInput.value == "") {
      errores.passConfirm = campoIncompleto;
    } else if (passConfirmInput.value.length < 8) {
      errores.passConfirm = longitudPassword;
    } else if (!strongRegex.test(passConfirmInput.value)) {
      errores.passConfirm = strongPass;
    } else if (passConfirmInput.value != passwordInput.value) {
      errores.passConfirm = passNoCoincide;
    }

    // Si el objeto errores tiene una o más propiedas agregamos los errores a cada campo / De lo contrario se envía el formulario
    if (Object.keys(errores).length >= 1) {
      if (errores.firstName) {
        erroresFirstName.innerHTML = errores.firstName;
      }
      if (errores.lastName) {
        erroresLastName.innerHTML = errores.lastName;
      }
      if (errores.email) {
        erroresEmail.innerHTML = errores.email;
      }
      if (errores.password) {
        erroresPass.innerHTML = errores.password;
      }
      if (errores.passConfirm) {
        erroresPassConfirm.innerHTML = errores.passConfirm;
      }
    } else {
      registerForm.submit();
    }
  });
});

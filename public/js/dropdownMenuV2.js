// Otra manera de hacer un dropdown mas casero

window.addEventListener("load", () => {
  const dropdownButton = document.querySelector("#dropdownButton");
  const dropdownMenu = document.querySelector("#dropdownMenu");
  const dropdownIcon = document.querySelector(".fa-bars");
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
  });
  window.addEventListener("click", e => {
    if (!(e.target == dropdownIcon)) {
      dropdownMenu.classList.remove("active");
    }
  });
});

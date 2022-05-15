document.addEventListener("click", e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  // Revisa por medio de un atributo de tipo data llamado data-dropdown-button
  // si lo que estamos clickeando es un boton que llama al dropdown
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  // Si estamos dentro del menu dropdown no queremos que se cierre

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown == currentDropdown) return; // el return hace como un corte de ejecucion
    dropdown.classList.remove("active");
  });
  // Cierra todos los dropdown almenos que sea el que hayamos clickeado
});

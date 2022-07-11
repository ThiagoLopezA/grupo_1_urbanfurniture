window.addEventListener("load", () => {
  let btnModal = document.querySelector("#addProduct");
  let modal = document.querySelector(".article__modal");
  let closeBtn = document.querySelector(".close__icon");

  btnModal.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  window.addEventListener("click", e => {
    if (e.target == modal || e.target == closeBtn) {
      modal.style.display = "none";
    }
  });
});

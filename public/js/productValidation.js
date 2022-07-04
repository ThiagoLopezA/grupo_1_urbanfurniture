window.addEventListener("load", ()=>{
    let name  = document.querySelector('#name');
    let price = document.querySelector('#price');
    let discount = document.querySelector('#discount');
    let description = document.querySelector('#description');
    let errorName = document.querySelector('.text-danger.name');
    let errorPrecio = document.querySelector('.text-danger.price');
    let errorDiscount = document.querySelector('.text-danger.discount');
    let errorDescription = document.querySelector('.text-danger.description');


    name.addEventListener('blur',(e)=>preventEmpty(e, errorName));
    price.addEventListener('blur',(e)=>preventEmpty(e, errorPrecio));
    discount.addEventListener('blur',(e)=>preventEmpty(e,errorDiscount));
    description.addEventListener('blur',(e)=>preventEmpty(e, errorDescription));

    function preventEmpty(event, element) {
        if (!event.target.value.length > 0) {
          element.innerText = "Campo vacio";
          return false;
        } else {
          element.innerText = "";
          return true;
        }
      }

})
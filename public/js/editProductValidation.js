window.addEventListener("load", ()=>{
    let name  = document.querySelector('#name');
    let price = document.querySelector('#price');
    let discount = document.querySelector('#discount');
    let description = document.querySelector('#description');
    let categories = document.querySelector('#categories')
    let formAgregar = document.querySelector('#formAgregar')
    let errorName = document.querySelector('.text-danger.name');
    let errorPrecio = document.querySelector('.text-danger.price');
    let errorDiscount = document.querySelector('.text-danger.discount');
    let errorDescription = document.querySelector('.text-danger.description');
    let errorCategories = document.querySelector('.text-danger.categories');
    let error = [];
    let inputs = [name, price, discount, description, categories]
    
    
    function preventEmpty(event, element, message) {
        if (!event.target.value.length > 0) {
          element.innerText = message;
          return true;
        } else {
          element.innerText = "";
          return false;
        }
    }

    function preventNumber(event,element,message){
        if(!event.target.value.length > 0){
            element.innerText = 'Campo vacio';
            return true
        } else if (event.target.value < 0) {
            element.innerText = message;
            return true
        }else{
            element.innerText = ''
            return false
        }
    }
    
    name.addEventListener('blur',(e)=>{
       error[0] = preventEmpty(e, errorName, 'Campo vacio')
    });
    price.addEventListener('blur',(e)=>{
        error[1] = preventNumber(e, errorPrecio, 'Precio invalido')
    });
    discount.addEventListener('blur',(e)=>{
        error[2] = preventNumber(e,errorDiscount, 'Descuento invalido')
    });
    description.addEventListener('blur',(e)=>{
        error[3] = preventEmpty(e, errorDescription, 'Campo vacio')
    });
    categories.addEventListener('blur',(e)=>{
        error[4] = preventEmpty(e,errorCategories, 'Seleccione una categoria')
    });

    formAgregar.addEventListener('submit', (e)=>{
            if(error.includes(true)){
                e.preventDefault();
            }else {
                inputs.forEach(i=>{
                    if(i.value.length == 0){
                        e.preventDefault();
                    }
                })
            }
        })
})
window.addEventListener('load', function(){

  let formulario = document.querySelector('form');
  
  formulario.addEventListener('submit', function(e){
    e.preventDefault();
    let input = document.querySelectorAll('input');
    let errorEmail = document.querySelector('.text-danger.email')
    let errorPass  = document.querySelector('.text-danger.pass')
   
    if (input[0].value == ""){
    errorEmail.innerText = 'No puede estar vacio este campo'
    }else {
      errorEmail.innerText = " ";
    }

    if (input[1].value == ""){
      errorPass.innerText = 'No puede estar vacio este campo'
    } else {
      errorEmail.innerText = " ";
   
  } 
    
  });


})
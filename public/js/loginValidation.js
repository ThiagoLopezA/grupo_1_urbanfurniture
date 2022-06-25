window.addEventListener('load', function(){

  let formulario = document.querySelector('form');
  let input = document.querySelectorAll('input');
  let errorEmail = document.querySelector('.text-danger.email');
  let errorPass  = document.querySelector('.text-danger.pass');
  let error = 1;
  
  input[0].addEventListener('blur', e =>{
    if (input[0].value == ""){
      errorEmail.innerText = 'No puede estar vacio este campo'
      error = 1;
      }else {
        errorEmail.innerText = " ";
        error = 0 
      }
  });

  input[1].addEventListener('blur', e =>{
    if (input[1].value == ""){
      errorPass.innerText = 'No puede estar vacio este campo'
      error = 1
    } else {
      errorEmail.innerText = " ";
      error = 0
    }
  })
  
  formulario.addEventListener('submit', function(e){
    if (error == 1){
  e.preventDefault();
  }
});

})
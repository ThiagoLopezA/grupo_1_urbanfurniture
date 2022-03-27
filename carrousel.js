'use string'

const grande = document.querySelector('.grande')
const punto = document.querySelectorAll('.punto')


//cuando haga click en puntos
    //saber la posicion de ese punto
    //aplicar un transform TranslateX al grande
    //Quitar la clase activo de todos los Puntos
    //añadir la clase activo al punto que hagamos el click


    //recorremos todos los puntos
punto.forEach( (cadaPunto, i ) => {
    //asignamos un click a cada punto
 punto[i].addEventListener ('click', () =>{

    console.log(i)
    let posicion = i
    //posicion es 0 transformX es 0
    //posicion es 1 transformX es -50%
    // operacion = posicion * -50
    let operacion = posicion * -50;

    grande.style.transform = 'translateX(${ operacion}%)'

    //recorremos todos los puntos
    punto.forEach (( cadaPunto, i) =>{
        punto[i].classList.remove('actvio')
    })
    punto[i].classList.add('activo')


 })   
});
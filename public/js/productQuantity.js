window.addEventListener("load", ()=>{
    let arrQuantity = document.querySelectorAll('.input');
    for (item of arrQuantity){
        let input = item.querySelector('.item__input')
       let increase = item.querySelector('.item__button--increase')
       let decrease = item.querySelector('.item__button--decrease')
        increase.addEventListener('click', ()=>{
            input.value++
        })
        decrease.addEventListener('click',()=>{
            if(input.value >=2){
                input.value--
            }
        })
    }
});

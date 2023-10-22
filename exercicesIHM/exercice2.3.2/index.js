const divs = document.querySelectorAll("div");

divs.forEach((divElement) => {
    divElement.addEventListener('mouseover',(div)=>{
    
        divElement.style.backgroundColor  = 'rgb(255 , 153 , 255)';
       
    });
    
});
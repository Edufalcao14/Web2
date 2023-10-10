const divs = document.querySelectorAll("#container");

divs.forEach((divElement) => {
    divElement.addEventListener('click',(div)=>{
        let rgb = "rgb(224, 152, 0)";
        divElement.style.backgroundColor  = rgb;
        divElement.innerText = "RGB COLOR : " + rgb;
    });
    
});
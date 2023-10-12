
const red = document.getElementById("div1");
const orange = document.getElementById("div2");
const green = document.getElementById("div3");
const body = document.querySelector("body");

let myIntervalId = 0;
let counter = 0;


body.addEventListener("mouseenter",startChangeColors);



function turnOnRed(){
    red.style.backgroundColor = 'red';
    orange.style.backgroundColor = 'white';;
    green.style.backgroundColor = 'white';;
}
function turnOnOrange(){
    red.style.backgroundColor = 'white';;
    orange.style.backgroundColor = 'orange';
    green.style.backgroundColor = 'white';;
}
function turnOnGreen(){
    red.style.backgroundColor = 'white';
    orange.style.backgroundColor = 'white';
    green.style.backgroundColor = 'green';
}

function startChangeColors(){
    intervalId = setInterval(() => {
        turnOnRed();
        setTimeout(turnOnOrange, 2000);
        setTimeout(turnOnGreen, 4000);
        setTimeout(turnOnOrange,6000);
        setTimeout(turnOnRed,8000);
      }, 10500);
}

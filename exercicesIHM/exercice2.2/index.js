const body = document.querySelector("body");
const message = document.getElementById("message");
const clicks = document.getElementById("clicks");

console.log("blblbl");

let clicksCounter = 0;

body.addEventListener("click", countClicks);

function countClicks() {
  clicksCounter++;
  

  if (clicksCounter >= 5 && clicksCounter <= 9) {
    message.textContent = 'Bravo, bel échauffement !"';
  } else if (clicksCounter > 9) {
    message.textContent = "Vous êtes passé maître en l'art du clic !";
  }
 
    clicks.textContent =  clicksCounter + " Clicks";

  console.log(clicksCounter);
}



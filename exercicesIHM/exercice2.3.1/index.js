const form = document.getElementById("form");
const btn = document.getElementById("btn");
const text = document.getElementById("text");
const textAfterSubmit = document.getElementById("textAfterSubmit");


btn.addEventListener("click" , submitForm);


function submitForm (e) {
    e.preventDefault();
    form.style.display = "none";
    let textForm = text.value;
    textAfterSubmit.innerText = textForm;
  };
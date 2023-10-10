let startTime = 0;
let intervalId;
let clicksCounter = 0;
const display = document.getElementById("display");
const clickBtn = document.getElementById("clickBtn");
const result = document.getElementById("result");

clickBtn.addEventListener("mouseenter", startGame);

function startGame() {
  clickBtn.removeEventListener("mouseenter", startGame);
  clickBtn.addEventListener("click", countClicks);
  clickBtn.style.backgroundColor = "green";
  startStopwatch();
  setTimeout(() => {
    if (clicksCounter < 10) {
      stopGame();
    }
  }, 5000); // Check if 5 seconds have passed without 10 clicks
}

function startStopwatch() {
  if (!intervalId) {
    startTime = Date.now() - (startTime > 0 ? startTime : 0);
    intervalId = setInterval(updateTime, 10);
  }
}

function stopStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
}

function updateTime() {
  const currentTime = Date.now() - startTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = currentTime % 1000;

  display.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
  return seconds;
}

function stopGame() {
  clickBtn.removeEventListener("click", countClicks);
  clickBtn.style.backgroundColor = "red";
  clickBtn.textContent = "Game over !"
  clickBtn.disabled = true;
  result.textContent = "Game over, you did not click 10 times within 5s !";
  stopStopwatch();
}

function countClicks() {
  clicksCounter++;
  let time = updateTime();
  clickBtn.style.backgroundColor = "green";
  if (clicksCounter >= 10 && time <= 5) {
    stopStopwatch();
    clickBtn.disabled = true;
    result.textContent =
      "You win ! You clicked 10 times within " + time + " ms";
  }

  if (clicksCounter === 10 && time > 5) {
    stopStopwatch();
    result.textContent = "Game over, you did not click 10 times within 5s !";
  }
  console.log("Clicks " + clicksCounter);
  console.log("time " + time);
}

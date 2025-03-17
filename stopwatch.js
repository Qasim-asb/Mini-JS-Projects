const display = document.querySelector(".stopwatch-display");
const controlBtns = document.querySelectorAll(".stopwatch-container button");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const start = () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
};

const stop = () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false
  }
};

const reset = () => {
  stop();
  elapsedTime = 0;
  display.textContent = "00:00:00:00";
};

const update = () => {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
  let seconds = Math.floor(elapsedTime / 1000 % 60);
  let milliSeconds = Math.floor(elapsedTime % 1000 / 10);

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  milliSeconds = String(milliSeconds).padStart(2, "0");

  display.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`
};

controlBtns.forEach(button => {

  button.addEventListener("click", (e) => {
    const action = e.target.dataset.action;

    if (action === "start") {
      start();
    } else if (action === "stop") {
      stop();
    } else if (action === "reset") {
      reset();
    }

  })

});
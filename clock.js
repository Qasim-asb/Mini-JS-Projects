document.addEventListener("DOMContentLoaded", () => {

  const clock = document.querySelector(".clock");

  setInterval(() => {
    const date = new Date();
    let hours = date.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    clock.textContent = timeString;
  }, 1000);

});
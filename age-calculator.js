const calculateBtn = document.querySelector(".calculate-btn");
const cd = document.getElementById("cd");
const ct = document.getElementById("ct");
const dob = document.getElementById("dob");
const bt = document.getElementById("bt");
const resultText = document.getElementById("resultText");

const setDefaultDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  cd.value = currentDate;
  ct.value = currentTime;
};

window.addEventListener("DOMContentLoaded", setDefaultDateTime);

const toggleInputs = (disabled) => {
  [cd, ct, dob, bt].forEach(input => (input.disabled = disabled));
};

const displayResult = (year, month, day, hour, minute) => {
  let result = [];

  if (year > 0) result.push(`${year} ${year === 1 ? "year" : "years"}`);
  if (month > 0) result.push(`${month} ${month === 1 ? "month" : "months"}`);
  if (day > 0) result.push(`${day} ${day === 1 ? "day" : "days"}`);
  if (hour > 0) result.push(`${hour} ${hour === 1 ? "hour" : "hours"}`);
  if (minute > 0) result.push(`${minute} ${minute === 1 ? "minute" : "minutes"}`);

  if (result.length === 0) {
    resultText.textContent = "You were just born! Welcome to the world! 🌍";
  } else {
    resultText.textContent = `You are ${result.join(", ")} old.`;
  }

  resultText.style.color = "#4b6cb7";
  calculateBtn.textContent = "OK";
  toggleInputs(true);
};

const showError = (message) => {
  resultText.textContent = message;
  resultText.style.color = "#f44336";
};

const calculateAge = () => {
  let year, month, day, hour, minute;

  const currentDate = cd.value;
  const currentTime = ct.value;
  const birthDate = dob.value;
  const birthTime = bt.value;

  if (!currentDate || !birthDate || !currentTime || !birthTime) {
    showError("Please select both the current date/time and your birth date/time.");
    return;
  }

  let [currentYear, currentMonth, currentDay] = currentDate.split('-').map(Number);
  let [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number);
  const [birthHour, birthMinute] = birthTime.split(':').map(Number);


  if (currentMinute >= birthMinute) {
    minute = currentMinute - birthMinute;
  } else {
    minute = currentMinute + 60 - birthMinute;
    currentHour--;
  }

  if (currentHour >= birthHour) {
    hour = currentHour - birthHour;
  } else {
    hour = currentHour + 24 - birthHour;
    currentDay--;
  }

  if (currentDay >= birthDay) {
    day = currentDay - birthDay;
  } else {
    const daysInPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    day = currentDay + daysInPreviousMonth - birthDay;
    currentMonth--;
  }

  if (currentMonth >= birthMonth) {
    month = currentMonth - birthMonth;
  } else {
    month = currentMonth + 12 - birthMonth;
    currentYear--;
  }

  year = currentYear - birthYear;

  if (year < 0) {
    showError("Current date must be after the date of birth.");
    return;
  } else {
    displayResult(year, month, day, hour, minute);
  }
};

const resetFunc = () => {
  setDefaultDateTime();
  dob.value = "";
  bt.value = "";
  resultText.textContent = "";
  calculateBtn.textContent = "Calculate Age";
  toggleInputs(false);
};

calculateBtn.addEventListener("click", () => {
  if (calculateBtn.textContent === "Calculate Age") {
    calculateAge();;
  } else {
    resetFunc();
  }
});
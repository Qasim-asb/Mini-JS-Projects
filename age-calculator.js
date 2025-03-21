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
  cd.disabled = disabled;
  ct.disabled = disabled;
  dob.disabled = disabled;
  bt.disabled = disabled;
};

const calculateAge = () => {
  let year, month, day, hour, minute;

  const currentDate = cd.value;
  const [currentYearStr, currentMonthStr, currentDayStr] = currentDate.split('-');
  let currentYear = Number(currentYearStr);
  let currentMonth = Number(currentMonthStr);
  let currentDay = Number(currentDayStr);

  const currentTime = ct.value;
  const [currentHourStr, currentMinuteStr] = currentTime.split(':');
  let currentHour = Number(currentHourStr);
  const currentMinute = Number(currentMinuteStr);

  const birthDate = dob.value;
  const [birthYearStr, birthMonthStr, birthDayStr] = birthDate.split('-');
  const birthYear = Number(birthYearStr);
  const birthMonth = Number(birthMonthStr);
  const birthDay = Number(birthDayStr);

  const birthTime = bt.value;
  const [birthHourStr, birthMinuteStr] = birthTime.split(':');
  const birthHour = Number(birthHourStr);
  const birthMinute = Number(birthMinuteStr);

  if (!currentDate || !birthDate || !currentTime || !birthTime) {
    resultText.textContent = "Please select both the current date/time and your birth date/time.";
    resultText.style.color = "#f44336";
    return;
  }

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
    resultText.textContent = "Current date must be after the date of birth.";
    resultText.style.color = "#f44336";
    return;
  } else {
    let unit = year ? year : month ? month : day ? day : hour ? hour : minute ? minute : null;

    switch (unit) {
      case year:
        resultText.textContent = `You are ${year} years, ${month} months, ${day} days, ${hour} hours, and ${minute} minutes old.`;
        break;
      case month:
        resultText.textContent = `You are ${month} months, ${day} days, ${hour} hours, and ${minute} minutes old.`;
        break;
      case day:
        resultText.textContent = `You are ${day} days, ${hour} hours, and ${minute} minutes old.`;
        break;
      case hour:
        resultText.textContent = `You are ${hour} hours, and ${minute} minutes old.`;
        break;
      case minute:
        resultText.textContent = `You are ${minute} minutes old.`;
        break;
      default:
        resultText.textContent = "You were just born! Welcome to the world! 🌍";
        break;
    }

    resultText.style.color = "#4b6cb7"
    calculateBtn.textContent = "OK";
    toggleInputs(true);
  }
};

const resetFunc = () => {
  cd.value = "";
  ct.value = "";
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
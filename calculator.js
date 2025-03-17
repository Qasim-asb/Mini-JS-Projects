const input = document.querySelector(".calculator-container input[type='text']");
const buttons = document.querySelectorAll(".calculator-container button");


buttons.forEach(button => {
  
  button.addEventListener("click", e => {
    const action = e.target.dataset.action;
    const buttonText = e.target.innerText;

    if (action !== "=" && action !== "AC" && action !== "DEL") {
      input.value += buttonText;
    } else if (action === "AC") {
      input.value = "";
    } else if (action === "DEL") {
      input.value = input.value.slice(0, input.value.length - 1);
    } else if (action === "=") {
      try {
        input.value = eval(input.value);
      } catch (error) {
        input.value = "Error";
      }
    }
  });

});
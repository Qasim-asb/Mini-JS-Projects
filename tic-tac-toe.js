const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector(".status-text");
const resetBtn = document.querySelector(".game-container .reset-btn");

let turnO = true;
let count = 0;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

resetBtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.textContent = "";
    box.disabled = false;
    box.style.backgroundColor = "";
    box.style.cursor = "pointer";
  });
  statusText.textContent = "";
  turnO = true;
  count = 0;
  resetBtn.textContent = "Reset Game";
});

const showWinner = (winner) => {
  statusText.textContent = `Player ${winner} wins!`;
  boxes.forEach(box => {
    box.disabled = true;
    box.style.cursor = "not-allowed";
  });
  resetBtn.textContent = "Play Again";
};

const checkWinner = () => {
  for (const condition of winConditions) {

    const [a, b, c] = condition;

    const pos1Val = boxes[a].textContent;
    const pos2Val = boxes[b].textContent;
    const pos3Val = boxes[c].textContent;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }

  if (count === 9) {
    statusText.textContent = "It's a draw!";
    resetBtn.textContent = "Play Again";
  }
};

boxes.forEach(box => {
  box.style.color = "#333"

  box.addEventListener("click", () => {
    count++;
    box.textContent = turnO ? "O" : "X";
    box.disabled = true;
    box.style.backgroundColor = "#fffc";
    box.style.cursor = "not-allowed";
    statusText.textContent = turnO ? "Player X's turn" : "Player O's turn";
    turnO = !turnO;

    checkWinner();
  });
});
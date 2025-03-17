const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskList = document.querySelector(".task-list");

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-task-btn">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    const deleteBtn = li.querySelector(".delete-task-btn");
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
    });
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});
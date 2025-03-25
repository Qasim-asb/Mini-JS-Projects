const todoAppContainer = document.querySelector(".todo-app-container");
const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskList = document.querySelector(".task-list");

let currentlyEditing = null;

const resetToAddMode = () => {
  currentlyEditing = null;
  addTaskBtn.textContent = "Add Task";
  taskInput.value = "";
  taskInput.focus();
};

const addOrUpdateTask = () => {
  const taskText = taskInput.value.trim();

  if (!taskText) {
    resetToAddMode();
    return;
  }

  if (!currentlyEditing) {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${taskText}</span>
          <div>
            <button class="edit-task-btn">Edit</button>
            <button class="remove-task-btn">Remove</button>
          </div>
        `;
    taskList.append(li);
  } else {
    currentlyEditing.querySelector("span").textContent = taskText;
  }
  resetToAddMode();
};

function setupEditMode(li) {
  const span = li.querySelector("span");
  currentlyEditing = li;
  taskInput.value = span.textContent;
  addTaskBtn.textContent = "Save";
  taskInput.focus();
}

todoAppContainer.addEventListener("click", (e) => {
  if (e.target === addTaskBtn) {
    addOrUpdateTask();
  } else if (e.target.classList.contains("remove-task-btn")) {
    e.target.closest('li').remove();
    taskInput.focus();
  } else if (e.target.classList.contains("edit-task-btn")) {
    const li = e.target.closest("li");
    currentlyEditing === li ? addOrUpdateTask() : setupEditMode(li);
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addOrUpdateTask();
});
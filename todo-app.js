const todoAppContainer = document.querySelector(".todo-app-container");
const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskList = document.querySelector(".task-list");

let currentlyEditing = null;

todoAppContainer.addEventListener("click", (e) => {
  if (e.target === addTaskBtn) {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
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
        currentlyEditing = null;
        addTaskBtn.textContent = "Add Task";
      }
      taskInput.value = "";
      taskInput.focus();
    }
  }

  if (e.target.classList.contains("remove-task-btn")) {
    e.target.closest('li').remove();
    taskInput.focus();
  }

  if (e.target.classList.contains("edit-task-btn")) {
    const li = e.target.closest("li");
    const span = li.querySelector("span");

    if (currentlyEditing === li) {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        span.textContent = taskText;
      }
      currentlyEditing = null;
      addTaskBtn.textContent = "Add Task";
      taskInput.value = "";
    } else {
      currentlyEditing = li;
      taskInput.value = span.textContent;
      addTaskBtn.textContent = "Save";
    }
    taskInput.focus();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});
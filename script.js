import { Column, Task } from "./trello/libs/model.js";
import { trello } from "./trello/libs/constant.js";
import { saveData, loadData } from "./trello/libs/store.js";

const formColumn = document.querySelector(".form-add-column");

function render() {
  const wraper = document.querySelector(".wraper");
  wraper.innerHTML = "";

  trello.columns.forEach((column) => {
    const columnsList = document.createElement("ul");

    columnsList.classList.add("column");

    const delitColumnBtn = document.createElement("button");
    delitColumnBtn.classList.add("delitColumn");
    delitColumnBtn.textContent = "X";

    
    const columnsHeader = document.createElement("li");
    const nameColumn = document.createElement("h3");
    nameColumn.textContent = column.name;
    columnsHeader.append(nameColumn, delitColumnBtn);

    columnsHeader.classList.add("column-header");
    
    const formAddTask = document.createElement("form");
    const inputAddTask = document.createElement("input");
    inputAddTask.name = "taskName";
    
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "add task";

    formAddTask.append(inputAddTask, addTaskButton);
    columnsHeader.append(formAddTask);
    columnsList.appendChild(columnsHeader);

    trello.task
      .filter((task) => task.columnId === column.uid)
      .forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.name;
        taskItem.classList.add("task-item");
        columnsList.appendChild(taskItem);
      });
      
      /// event

      formAddTask.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = e.target.taskName.value;
        if (name) {
          createTask(name, column);
        }
      });

      delitColumnBtn.addEventListener("click", () => {
        deliteColumn(column, columnsList);
      });

    wraper.appendChild(columnsList);
  });
}
function createColumn(e) {
  e.preventDefault();
  const columnName = e.target.name.value.trim();
  if (columnName) {
    const newColumn = Column(columnName);
    trello.columns.push(newColumn);
    e.target.name.value = "";
    saveData("trello", trello);
    render();
  }
}

function createTask(name, column) {
  const newTask = Task(name, column.uid);

  trello.task.push(newTask);

  saveData("trello", trello);
  render();
}

function deliteColumn(column, columnsList) {
  trello.columns = trello.columns.filter((item) => item.uid !== column.uid);
  trello.task = trello.task.filter((task) => task.columnId !== column.uid);

  columnsList.remove();
  saveData("trello", trello);
}

window.addEventListener("DOMContentLoaded", () => {
  const loadedData = loadData("trello", trello);
  Object.assign(trello, loadedData);
  render();
});


formColumn.addEventListener("submit", (e) => createColumn(e));

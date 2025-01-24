import { Column, Task } from "./trello/libs/model.js";
import { trello } from "./trello/libs/constant.js";
import { saveData, loadData } from "./trello/libs/store.js";

const formColumn = document.querySelector(".form-add-column");
console.log(trello);
export function render() {
  const wraper = document.querySelector(".wraper");
  wraper.innerHTML = "";

  trello.columns.forEach((column) => {
    const columnsList = document.createElement("ul");

    columnsList.classList.add("column");

    const delitColumnBotton = document.createElement("button");
    delitColumnBotton.classList.add("delitColumnButton");
    delitColumnBotton.textContent = "X";

    const columnsHeader = document.createElement("li");
    const nameColumn = document.createElement("h3");
    nameColumn.textContent = column.name;
    columnsHeader.append(nameColumn, delitColumnBotton);

    columnsHeader.classList.add("column-header");

    const formAddTask = document.createElement("form");
    formAddTask.classList.add("form-add-task");
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
        const taskName = document.createElement("h6");

        taskName.textContent = task.name;
        taskItem.classList.add("task-item");

        const delitTaskButton = document.createElement("button");
        delitTaskButton.textContent = "remove";

        const editTaskButton = document.createElement("button");
        editTaskButton.textContent = " edit";
        editTaskButton.classList.add("edit");

        const editInput = document.createElement("input");
        editInput.style.display = "none";
        editInput.value = task.name;

        const saveEditButton = document.createElement("button");
        saveEditButton.classList.add("save-edit-button");
        saveEditButton.textContent = "save";
        saveEditButton.style.display = "none";

        editTaskButton.addEventListener("click", () => {
          taskName.style.display = "none";
          editInput.style.display = "block";
          saveEditButton.style.display = "block";
          editTaskButton.style.display = "none";
        });

        saveEditButton.addEventListener("click", () => {
          const newNameTask = editInput.value.trim();
          if (newNameTask) {
            task.name = newNameTask;
            taskName.textContent = newNameTask;
            saveData("trello", trello);
          }

          taskName.style.display = "block";
          editInput.style.display = "none";
          editTaskButton.style.display = "block";
          saveEditButton.style.display = "none";
        });

        const select = document.createElement("select");

        trello.columns.forEach((nameColumn) => {
          const option = document.createElement("option");
          option.value = nameColumn.name;
          option.textContent = nameColumn.name;

          if (task.columnId === nameColumn.uid) {
            option.selected = true;
          }

          select.append(option);
        });

        select.addEventListener("change", (e) => {
          const nameSelect = e.target.value;
          const column = trello.columns.find(
            (item) => item.name === nameSelect
          );

          task.columnId = column.uid;

          saveData("trello", trello);
          render();
        });

        taskItem.append(
          taskName,
          editInput,
          delitTaskButton,
          editTaskButton,
          saveEditButton,
          select
        );
        columnsList.append(taskItem);

        delitTaskButton.addEventListener("click", () =>
          deliteTask(task, taskItem)
        );
      });

    /// event

    formAddTask.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.taskName.value.trim();
      if (name) {
        createTask(name, column);
      }
    });

    delitColumnBotton.addEventListener("click", () => {
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
  render();
}

function deliteTask(task, taskItem) {
  trello.task = trello.task.filter((item) => item.uid !== task.uid);
  saveData("trello", trello);
  taskItem.remove();
}


window.addEventListener("DOMContentLoaded", () => {
  const loadedData = loadData("trello", trello);
  Object.assign(trello, loadedData);
  console.log('desh');
  render();
});

formColumn.addEventListener("submit", (e) => createColumn(e));

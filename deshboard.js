import { Column, Task } from "./trello/libs/model.js";
import { trello } from "./trello/libs/constant.js";
import { saveData, loadData } from "./trello/libs/store.js";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "./trello/libs/services.js";

const formColumn = document.querySelector(".form-add-column");
const signOut = document.querySelector(".sign-out");

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

            putData(`task/${task.id}`, { ...task });
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
          putData(`task/${task.id}`, { ...task });
          // saveData("trello", trello);
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

async function createColumn(e) {
  e.preventDefault();
  const columnName = e.target.name.value.trim();
  if (columnName) {
    const newColumn = Column({ name: columnName, userId: trello.user.uid });
    trello.columns.push(newColumn);
    console.log(newColumn);
    e.target.name.value = "";
    postData("columns", newColumn);

    trello.columns = (await getData(`columns?userId=${trello.user.uid}`)) || {};

    // saveData("trello", trello);
    render();
  }
}

async function createTask(name, column) {
  const newTask = Task({
    name: name,
    columnId: column.uid,
    userId: trello.user.uid,
  });
  console.log(newTask);
  trello.task.push(newTask);
  postData("task", newTask);

  trello.task = (await getData(`task?userId=${trello.user.uid}`)) || {};
  // saveData("trello", trello);
  render();
}

async function deliteColumn(column, columnsList) {
  const taskDeletionPromises = trello.task
    .filter((task) => task.columnId === column.uid)
    .map((task) => deleteData(`task/${task.id}`)); // Створюємо масив промісів для завдань

  trello.columns = trello.columns.filter((item) => item.uid !== column.uid);
  trello.task = trello.task.filter((task) => task.columnId !== column.uid);

  taskDeletionPromises.push(deleteData(`columns/${column.id}`));

  Promise.all(taskDeletionPromises);
  // trello.columns = (await getData("columns")) || {};

  // trello.task = (await getData("task")) || {};
  // saveData("trello", trello);
  columnsList.remove();
  render();
}

function deliteTask(task, taskItem) {
  trello.task = trello.task.filter((item) => item.uid !== task.uid);
  console.log(task);
  // saveData("trello", trello);
  deleteData(`task/${task.id}`);

  taskItem.remove();
}

window.addEventListener("DOMContentLoaded", async () => {
  trello.user = loadData("trelloUser",[])[0];
  trello.columns = (await getData(`columns?userId=${trello.user.uid}`)) || {};
  trello.task = (await getData(`task?userId=${trello.user.uid}`)) || {};

  console.log(trello);
  render();
  
});

formColumn.addEventListener("submit", (e) => createColumn(e));

signOut.addEventListener("click", () => {
  trello.user = {};
  // saveData("trello", trello.user);
});

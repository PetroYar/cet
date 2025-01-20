import { Task } from "./trello/libs/model.js";
import { trello } from "./trello/libs/constant.js";
import { saveData, loadData } from "./trello/libs/store.js";

const form = document.querySelector(".form");
const taskList = document.querySelector(".task");
const progressList = document.querySelector(".progress");
const completedList = document.querySelector(".completed");

const formEdit = document.querySelector(".form-edit");
const formEditEsc = document.querySelector(".form-edit__esc");

function addTask(e) {
  e.preventDefault();

  const value = e.target.task.value.trim();

  if (value === "") return;

  const task = Task(value);
  trello.task.push(task);

  createItem(task);

  form.reset();

  saveData();
}
export function createItem(task) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const select = document.createElement("select");
  const edit = document.createElement("button");

  const option = document.createElement("option");
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option.value = "task";
  option1.value = "progress";
  option2.value = "completed";

  option.textContent = "Task";
  option1.textContent = "In Progress";
  option2.textContent = "Completed";

  select.appendChild(option);
  select.appendChild(option1);
  select.appendChild(option2);

  li.textContent = task.name;
  btn.textContent = "Delete";
  edit.textContent = "Edit";

  li.appendChild(select);
  li.appendChild(edit);
  li.appendChild(btn);
  taskList.appendChild(li);

  btn.addEventListener("click", () => {
    li.remove();
    trello.task = trello.task.filter((el) => el.uid !== task.uid);
    console.log(trello.task);
  });

  edit.addEventListener("click", () => {
    formEdit.classList.add("visable");
    const input = formEdit.querySelector("input");
    input.value = task.name;

    formEdit.addEventListener("submit", function edit(e) {
      e.preventDefault();

      const newValue = e.target.task.value.trim();
      if (newValue === "") return;

      const taskFind = trello.task.find((el) => el.uid === task.uid);
      if (taskFind) {
        taskFind.name = newValue;
      }

      li.firstChild.textContent = newValue;

      saveData();

      formEdit.classList.remove("visable");

      formEdit.removeEventListener("submit", edit);
    });
  });

  select.value =
    task.columnId === 0
      ? "task"
      : task.columnId === 1
      ? "progress"
      : "completed";

  select.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    const taskFind = trello.task.find((el) => el.uid === task.uid);

    if (selectedValue === "task") {
      taskFind.columnId = 0;
      taskList.appendChild(li);
    } else if (selectedValue === "progress") {
      taskFind.columnId = 1;
      progressList.appendChild(li);
    } else if (selectedValue === "completed") {
      taskFind.columnId = 2;
      completedList.appendChild(li);
    }

    saveData();
  });
  return li;
}

window.addEventListener(
  "DOMContentLoaded",
  loadData(taskList, progressList, completedList)
);

form.addEventListener("submit", (e) => addTask(e));

formEditEsc.addEventListener("click", () => {
  formEdit.classList.remove("visable");
});

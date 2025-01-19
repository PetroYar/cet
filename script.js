const form = document.querySelector(".form");
const taskList = document.querySelector(".task");
const progressList = document.querySelector(".progress");
const completedList = document.querySelector(".completed");
// const edit = document.querySelector(".edit");
const formEdit = document.querySelector(".form-edit");
const formEditEsc = document.querySelector(".form-edit__esc");

const trello = {
  task: [],
  columns: [
    { name: "task", id: 0 },
    { name: "progress", id: 1 },
    { name: "completed", id: 2 },
  ],
};

function Base() {
  const uid = Math.floor(Math.random() * 444);
  return {
    uid,
    createDate: new Date().toLocaleDateString("uk-UA"),
  };
}

function Task(name, columnId = 0) {
  return {
    ...Base(),
    name,
    columnId,
  };
}

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
function createItem(task) {
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

function saveData() {
  localStorage.setItem("trello", JSON.stringify(trello));
}
function loadData() {
  const data = JSON.parse(localStorage.getItem("trello"));
  if (data) {
    trello.task = data.task || [];
    trello.task.forEach((task) => {
      const li = createItem(task);

      if (task.columnId === 0) {
        taskList.appendChild(li);
      } else if (task.columnId === 1) {
        progressList.appendChild(li);
      } else if (task.columnId === 2) {
        completedList.appendChild(li);
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", loadData());

form.addEventListener("submit", (e) => addTask(e));

formEditEsc.addEventListener("click", () => {
  formEdit.classList.remove("visable");
});

const form = document.querySelector(".form");
const taskList = document.querySelector(".task");
const progressList = document.querySelector(".progress");
const completedList = document.querySelector(".completed");

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
  const remuve = document.createElement('button')

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
  remuve.textContent = "Remuve";


  btn.addEventListener("click", () => {
    li.remove();
    trello.task = trello.task.filter((el) => el.uid !== task.uid);
    console.log(trello.task);
  });

  remuve.addEventListener('click',()=>{
    console.log(remuve)
  })

  li.appendChild(select);
  li.appendChild(remuve);
  li.appendChild(btn);
  
  taskList.appendChild(li);

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

window.addEventListener("onLoad", loadData());
form.addEventListener("submit", (e) => addTask(e));

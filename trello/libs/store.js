export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function loadData(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  
}

// import { trello } from "./constant.js";
// import { createItem } from "../../script.js";

// export function saveData() {
//   localStorage.setItem("trello", JSON.stringify(trello));
// }
// export function loadData(taskList, progressList, completedList) {
//   const data = JSON.parse(localStorage.getItem("trello"));
//   if (data) {
//     trello.task = data.task || [];
//     trello.task.forEach((task) => {
//       const li = createItem(task);

//       if (task.columnId === 0) {
//         taskList.appendChild(li);
//       } else if (task.columnId === 1) {
//         progressList.appendChild(li);
//       } else if (task.columnId === 2) {
//         completedList.appendChild(li);
//       }
//     });
//   }
// }

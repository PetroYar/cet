import { trello } from "../libs/constant.js";
import { isExist } from "../libs/helper.js";
import { loadData } from "../libs/store.js";
const form = document.querySelector(".login-form");
const errorMsg = document.querySelector(".error");
function loginUser(e) {
  
  const password = e.target.password.value;
  const email = e.target.email.value;
  console.log(trello);
  console.log(password,email)

  const userExistsPassword = isExist(trello.users, "password", password);
  const userExistsEmail = isExist(trello.users, "email", email);

  if (userExistsEmail && userExistsPassword) {
    window.location.href = "/deshboard.html";
    errorMsg.textContent = ``;
  } else {
    errorMsg.textContent = "Incorrect password or email";
    console.log(trello);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser(e);
});



window.addEventListener("DOMContentLoaded", () => {
  const loadedData = loadData("trello", trello);
  Object.assign(trello, loadedData);
  console.log('login');
});
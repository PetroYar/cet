import { trello } from "../libs/constant.js";
import { isExist } from "../libs/helper.js";
import { getData } from "../libs/services.js";
import { saveData } from "../libs/store.js";
const form = document.querySelector(".login-form");
const errorMsg = document.querySelector(".error");
function loginUser(e) {
  const password = e.target.password.value;
  const email = e.target.email.value;

  const userExistsPassword = isExist(trello.users, "password", password);
  const userExistsEmail = isExist(trello.users, "email", email);

  if (userExistsEmail && userExistsPassword) {
    const user = trello.users.find((user) => user.email === email);
    saveData('trelloUser',user)
    window.location.href = "../home.html";
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

window.addEventListener("DOMContentLoaded", async () => {
  trello.users = (await getData("users")) || {};
  
  console.log("login");
});

import { trello } from "../libs/constant.js";
import { isExist } from "../libs/helper.js";
const form = document.querySelector(".login-form");
const errorMsg = document.querySelector(".error");
function loginUser(e) {
  const form = e.target;
  const userName = form.userName;
  const email = form.email;

  const userExistsName = isExist(trello.users, 'name', userName);
  const userExistsEmail = isExist(trello.users, 'email', email);

  if (userExistsEmail && userExistsName) {

    window.location.href = "/deshboard.html";
    errorMsg.textContent =``;
  } else {
    errorMsg.textContent = "Incorrect password or email";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser(e);
});

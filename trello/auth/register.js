import { User } from "../libs/model.js";
import { trello } from "../libs/constant.js";
import { isExist } from "../libs/helper.js";
import { saveData } from "../libs/store.js";
import { postData } from "../libs/services.js";
import { getData } from "../libs/services.js";
const form = document.querySelector(".register-form");
const errorNameMsg = document.querySelector(".error-name");
const errorEmailMsg = document.querySelector(".error-email");

function newUser(e) {
  e.preventDefault();

  const form = e.target;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  const user = User({
    name: username,
    email: email,
    password: password,
  });

  const userExistsName = isExist(trello.users, "name", username);
  const userExistsEmail = isExist(trello.users, "email", email);

  if (!userExistsName) {
    if (!userExistsEmail) {
      trello.users.push(user);
      
      trello.user = user;
      errorNameMsg.textContent = "";
      errorEmailMsg.textContent = "";
      postData("users", user);
      saveData("trelloUser", user);
      form.reset();
      window.location.href = "/deshboard.html";
    } else {
      errorEmailMsg.textContent = "A user with this email already exists";
      errorNameMsg.textContent = "";
    }
  } else {
    errorNameMsg.textContent = "User with such name already exists";
  }
  console.log(trello.users);
}

window.addEventListener("DOMContentLoaded", async () => {
  // const loadedData = loadData("trello", trello);
  // Object.assign(trello, loadedData);
  trello.users = (await getData("users")) || {};

  console.log("desh");
});

form.addEventListener("submit", (e) => newUser(e));

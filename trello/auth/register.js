import { User } from "../libs/model.js";
import { trello } from "../libs/constant.js";
import { isExist } from "../libs/helper.js";
import { saveData,loadData } from "../libs/store.js";

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
      console.log(user,trello)
      trello.user = user;
      errorNameMsg.textContent = "";
      errorEmailMsg.textContent = "";

      saveData("trello", trello);
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

window.addEventListener("DOMContentLoaded", () => {
  const loadedData = loadData("trello", trello);
  Object.assign(trello, loadedData);
  console.log('desh');
  
});

form.addEventListener("submit", (e) => newUser(e));

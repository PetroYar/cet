import { deleteData, getData } from "../services.js";
import { loadData } from "../store.js";

export function renderComment(comments, list) {
  comments.forEach(async (comment) => {
    const [user] = await getData(`users?uid=${comment.userId}`);

    const li = document.createElement("li");
    li.classList.add("comment-item");
    const a = document.createElement("a");

    a.textContent = user.name;
    a.href = `../userComments/userComments.html?userId=${comment.userId}`;
    const p = document.createElement("p");
    p.textContent = comment.text;
    const btnDelit = document.createElement("button");
    btnDelit.textContent = "delete";

    if (comment.userId === loadData("trelloUser").uid) {
      li.append(btnDelit);
      btnDelit.addEventListener("click", () => {
        deleteData(`comments/${comment.id}`);
        li.remove();
      });
    }
    const spanTime = document.createElement("span");
    spanTime.textContent = comment.createDate;
    spanTime.classList.add("date");
    li.append(a, p, spanTime);
    list.append(li);
  });
}

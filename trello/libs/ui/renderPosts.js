import { deleteData, getData } from "../services.js";
import { loadData } from "../store.js";

export function renderPosts(posts, postsList) {
  posts.forEach(async (post) => {
    const [user] = await getData(`users?uid=${post.userId}`);

    const li = document.createElement("li");
    
    const userPosts = document.createElement("a");
    userPosts.textContent = user.name;
    userPosts.href = "../userPosts/userPosts.html?userId=" + post.userId;

    const img = document.createElement("img");

    img.src =
      user.img ||
      "https://www.perunica.ru/uploads/posts/2011-10/1319832745_0_6065c_b70de565_l.jpg";
    img.classList.add("post-photo");
    userPosts.prepend(img);
    const span = document.createElement("span");
    span.classList.add("date");
    span.textContent = post.createDate;
    li.append(userPosts, span);

    const a = document.createElement("a");
    a.href = `../post/post.html?slug=${post.slug}`;
    const aEdit = document.createElement("a");
    aEdit.href = `../post/post-edit.html?id=${post.id}`;
    aEdit.text = "edit";
    li.append(a, aEdit);
    const btnDelite = document.createElement("button");
    btnDelite.textContent = "delete";

    if (loadData("trelloUser").uid === post.userId) {
      li.append(btnDelite);
      btnDelite.addEventListener("click", () => {
        deleteData(`posts/${post.id}`);
        li.remove();
      });
    }
    const h6 = document.createElement("h6");
    h6.textContent = post.title;
    a.append(h6);
    postsList.append(li);
  });
}

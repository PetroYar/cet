import { getData } from "../../libs/services.js";


function renderPosts(posts) {
  const postsList = document.querySelector(".post__list");

  posts.forEach(async (post) => {

    const [user] = await getData(`users?uid=${post.userId}`);

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `../post/post.html?slug=${post.slug}`;
    li.append(a);
    const img = document.createElement("img");
    img.src = user.img ||
      "https://www.perunica.ru/uploads/posts/2011-10/1319832745_0_6065c_b70de565_l.jpg";
    img.classList.add("post-photo");
    a.append(img);
    const userPosts = document.createElement("a");
    userPosts.href = '../userPosts/userPosts.html'
    userPosts.textContent = user.name + " " + post.createDate;
    li.append(userPosts);
    const h6 = document.createElement("h6");
    h6.textContent = post.title;
    a.append(h6);
    postsList.append(li);
  });
}

(async () => {
  const posts = await getData("posts");
  const reversePost = [...posts].reverse();
  renderPosts(reversePost);
})();

import { Comment } from "../../libs/model.js";
import { getData, postData } from "../../libs/services.js";
import { loadData } from "../../libs/store.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const commentForm = document.querySelector(".post__comment-form");

function render(post) {
  const postContainer = document.querySelector(".post__description");
  post.data.blocks.forEach((block) => {
    if (block.type === "header") {
      const title = document.createElement("h1");
      title.textContent = block.data.text;
      title.classList.add("h1-title");
      postContainer.append(title);
    } else if (block.type === "paragraph") {
      const paragraf = document.createElement("p");
      paragraf.textContent = block.data.text;
      postContainer.append(paragraf);
    }
  });
}

function renderComment(comment, user) {
  const list = document.querySelector(".post__comments-list");
  const li = document.createElement("li");
  li.classList.add("comment-item");
  const span = document.createElement("span");
  span.textContent = user.name;
  const p = document.createElement("p");
  p.textContent = comment.text;
  const spanTime = document.createElement("span");
  spanTime.textContent = comment.createDate;
  spanTime.classList.add("comment-time");
  li.append(span, p, spanTime);
  list.append(li);
}

async function addComment(e) {
  const [post] = await getData(`posts?slug=${slug}`);
  const user = loadData("trelloUser");
  const comment = Comment({
    text: e.target.comment.value,
    userId: user.uid,
    postId: post.uid,
  });
  postData("comments", comment);
  renderComment(comment, user);
  e.target.comment.value = "";
}

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addComment(e);
});

const loadPostsData = async () => {
  try {
    const [post] = await getData(`posts?slug=${slug}`);
    render(post);
    const comments = await getData(`comments?postId=${post.uid}`);
    
    comments.forEach(async (comment) => {
      const [user] = await getData(`users?uid=${comment.userId}`);
      renderComment(comment, user);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

loadPostsData();

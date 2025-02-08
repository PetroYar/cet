import { Comment } from "../../libs/model.js";
import { deleteData, getData, postData } from "../../libs/services.js";
import { loadData } from "../../libs/store.js";
import { renderComment } from "../../libs/ui/renderComments.js";
const list = document.querySelector(".post__comments-list");
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


async function addComment(e) {
  const [post] = await getData(`posts?slug=${slug}`);
  const user = loadData("trelloUser");
  const comment = Comment({
    text: e.target.comment.value,
    userId: user.uid,
    postId: post.uid,
  });
  postData("comments", comment);
  // renderComment(comment,list);
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

   
      renderComment(comments,list);
   
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

loadPostsData();

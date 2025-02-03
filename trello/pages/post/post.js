import { getData } from "../../libs/services.js";

import { trello } from "../../libs/constant.js";

// const output = document.getElementById("output");

// // Функція для рендеру
// function renderPost(postData) {
//   let html = "";

//   postData.blocks.forEach((block) => {
//     if (block.type === "header") {
//       html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
//     } else if (block.type === "paragraph") {
//       html += `<p>${block.data.text}</p>`;
//     } else if (block.type === "list") {
//       let listType = block.data.style === "ordered" ? "ol" : "ul";
//       html += `<${listType}>`;
//       block.data.items.forEach((item) => {
//         html += `<li>${item}</li>`;
//       });
//       html += `</${listType}>`;
//     }
//   });

//   output.innerHTML = html;
// }

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

function render(post) {
  const postContainer = document.querySelector(".post__container");
  post.data.blocks.forEach((block) => {

    if (block.type === "header") {
      const title = document.createElement('h1')
      title.textContent = block.data.text
      title.classList.add('h1-title')
      postContainer.append(title)
    } else if (block.type === "paragraph") {
      const paragraf = document.createElement("p");
      paragraf.textContent = block.data.text
      postContainer.append(paragraf)

    } 
  });
  
}

const loadPosts = async () => {
  try {
    const [post] = await getData(`posts?slug=${slug}`);
    render(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

loadPosts();

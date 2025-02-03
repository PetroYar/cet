import { getData } from "../../libs/services.js";



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

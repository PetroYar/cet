import { getData, getTotalCount } from "../../libs/services.js";
import { renderPosts } from "../../libs/ui/renderPosts.js";

const postsList = document.querySelector(".post__list");

const params = new URLSearchParams(window.location.search);
const _limit = params.get("_limit") || 3;
const _start = params.get("_start") || 0;



let currentPage = 0;
let totalPages = 0;
let limit = 4;

function createPagination(totalCount, limit, start) {
  const container = document.querySelector(".pagination__count");
  container.innerHTML = "";

  totalPages = Math.ceil(totalCount / limit);
  currentPage = Math.floor(start / limit);

  for (let i = 0; i < totalPages; i++) {
    const a = document.createElement("a");
    a.classList.add("pagination__button");
    a.textContent = i + 1;
    a.href = `?_limit=${_limit}&_start=${i * _limit}&page=${i + 1}`;

    currentPage === i && a.classList.add("active-btn");

    container.append(a);
  }
}

async function getPosts() {
  postsList.innerHTML = "";

  const posts = await getData(
    `posts?_start=${_start}&_limit=${_limit}&_sort=id&_order=desc`
  );
  const response = await getTotalCount("posts");
  const totalCount = response.headers.get("X-Total-Count") || 20;
  renderPosts(posts,postsList);
  createPagination(totalCount, _limit, _start);
}

getPosts();

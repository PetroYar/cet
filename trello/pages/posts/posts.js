import { getData } from "../../libs/services.js";

import { trello } from "../../libs/constant.js";

function render(posts) {
  posts[0].data.blocks.forEach((element) => {
    console.log(element)
  });
}

const loadPosts = async () => {
  try {
    trello.posts = (await getData("posts")) || {};
    render(trello.posts);
    console.log(trello);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

loadPosts();

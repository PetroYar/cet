import { getData } from "../../libs/services.js";
import { renderPosts } from "../../libs/ui/renderPosts.js";

const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

const userPosts = await getData("posts?userId=" + userId);



renderPosts(userPosts,document.querySelector('.post__list'))
import { getData } from "../../libs/services.js";
import { renderComment } from "../../libs/ui/renderComments.js";


const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

const userComments = await getData("comments?userId=" + userId);
const list = document.querySelector('.comments-list')

renderComment(userComments,list)
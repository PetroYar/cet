import { Post } from "../libs/model.js";
import { trello } from "../libs/constant.js";

const editor = new EditorJS({
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Enter your header",
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 2,
      },
    },
  },
});

const saveBtn = document.querySelector(".save");

// Зберігання даних
saveBtn.addEventListener("click", () => {
  editor
    .save()
    .then((data) => {
      const post = new Post({ userId: trello.user.uid, data });
      console.log(post);
      window.location.href = "./blog.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

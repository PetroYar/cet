import { Post } from "../../libs/model.js";
import { trello } from "../../libs/constant.js";
import { postData } from "../../libs/services.js";
import { loadData } from "../../libs/store.js";

trello.user = loadData("trelloUser", null);

const editor = new EditorJS({
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Enter your title",
        defaultLevel: 2,
      },
    },
  },
  data: {
    blocks: [
      {
        type: "header",
        data: {
          level: 2,
        },
      },
    ],
  },
});

const saveBtn = document.querySelector(".save");

saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  editor
    .save()
    .then(async (data) => {
      const titleBlock = data.blocks.find((block) => block.type === "header");
      if (!titleBlock) {
        return;
      }

      const title = titleBlock.data.text;

   
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const post = new Post({
        userId: trello.user.uid,
        title,
        slug,
        data,
      });

      await postData("posts", post);
      window.location.href = "../posts/posts.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

import { getData, putData } from "../../libs/services.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const [post] = await getData("posts?id=" + id);

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
  data: post.data,
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

      const updatedPost = {
        userId: post.userId,
        title,
        slug,
        data,
      };

      await putData(`posts/${post.id}`, updatedPost);

      window.location.href = "../posts/posts.html";
    })
    .catch((error) => {
      console.error(error);
    });
});

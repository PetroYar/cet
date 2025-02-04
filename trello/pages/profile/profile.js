import { loadData } from "../../libs/store.js";

function render(user){
  const name = document.querySelector('.info__name')
  name.textContent = user.name
  const imgContainer = document.querySelector('.info__photo')
  const img = document.createElement('img')
  img.src =
    user.img ||
    "https://www.perunica.ru/uploads/posts/2011-10/1319832745_0_6065c_b70de565_l.jpg";
    imgContainer.append(img)
}


(() => {
  const user = loadData("trelloUser");
  render(user)
})();
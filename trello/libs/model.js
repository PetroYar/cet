import { formatDate } from "./helper.js";

export function Base() {
  const uid = Math.floor(Math.random() * 9999);
  return {
    uid,
    createDate: new Date(),
    updateDate: new Date(),
  };
}

export function User({ name, email, password }) {
  return {
    ...Base(),
    name,
    email,
    password,
  };
}
const PIERMITION = {
  ADMIN: 0,
  MODERATOR: 1,
  CREATOR: 2,
};
export function Admin({ name, email, password }, permition) {
  return {
    ...User({ name, email, password }),
    permition
  };
}

// const petro = Admin({name:'fggff',password:'dsff',email:'sdff@ff'},PIERMITION.ADMIN)


export function Column({ name, userId, color }) {
  return {
    ...Base(),
    name,
    userId,
    color,
  };
}
export function Task({ name, columnId, userId }) {
  return {
    ...Base(),
    name,
    columnId,
    userId,
  };
}
export function Post({ userId, data, slug, title, categoryId }) {
  const base = Base();
  const createDate = formatDate(base.createDate);
  return {
    ...{ ...base, createDate },
    userId,
    data,
    slug,
    title,
    categoryId: categoryId ?? null,
  };
}

export function Comment({ text, userId, postId }) {
  const base = Base();
  const createDate = formatDate(base.createDate);
  return {
    ...{ ...base, createDate },
    text,
    userId,
    postId,
  };
}

export function Category(name) {
  return {
    ...Base(),
    name,
  };
}

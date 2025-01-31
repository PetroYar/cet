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

export function Column({ name, userId,color }) {
  return {
    ...Base(),
    name,
    userId,
    color
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
export function Post({ userId,data }) {
  return {
    ...Base(),
    userId,
    data
  };
}

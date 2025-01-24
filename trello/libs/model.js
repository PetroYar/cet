export function Base() {
  const uid = Math.floor(Math.random() * 9999);
  return {
    uid,
    createDate: new Date(),
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

export function Column(name, userId) {
  return {
    ...Base(),
    name,
    userId,
  };
}
export function Task({name, columnId , userId}) {
  return {
    ...Base(),
    name,
    columnId,
    userId
  };
}

export function Base() {
  const uid = Math.floor(Math.random() * 444);
  return {
    uid,
    createDate: new Date().toLocaleDateString("uk-UA"),
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

export function Column(name) {
  return {
    ...Base(),
    name,
  };
}
export function Task(name, columnId) {
  return {
    ...Base(),
    name,
    columnId,
  };
}

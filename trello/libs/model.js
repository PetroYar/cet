export function Base() {
  const uid = Math.floor(Math.random() * 444);
  return {
    uid,
    createDate: new Date().toLocaleDateString("uk-UA"),
  };
}

export function Task(name, columnId = 0) {
  return {
    ...Base(),
    name,
    columnId,
  };
}

export function User({name, email, password}) {
  return {
    ...Base(),
    name,
    email,
    password,
  };
}

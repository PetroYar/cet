export function isExist(arr, key, value) {
  return arr.some((el) => el[key] === value);
}

export function formatDate(base) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .format(base.createDate)
    .replace(" р.", " року");
}
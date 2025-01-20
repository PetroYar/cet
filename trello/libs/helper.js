export function isExist(arr, key, value) {
  return arr.some((el) => el[key] === value);
}

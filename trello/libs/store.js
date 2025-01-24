export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function loadData(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  
}

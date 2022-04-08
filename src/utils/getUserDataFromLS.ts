export function getUserDataFromLS() {
  return localStorage.getItem(`${window.location.hostname}-user-data`);
}
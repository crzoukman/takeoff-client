export function deleteUserDataFromLS() {
  localStorage.removeItem(`${window.location.hostname}-user-data`);
}
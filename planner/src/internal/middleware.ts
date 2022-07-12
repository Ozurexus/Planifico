export function isAuth() {
  const item = localStorage.getItem('authorized');
  if (item === null || item == undefined || item == 'false') {
    return false;
  }
  return true;
}

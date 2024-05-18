export function getSessionToken() {
  const tokenString = sessionStorage.getItem("token");
  return tokenString;
}

export function authHeaders() {
  let token = sessionStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
}

export function withOutAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

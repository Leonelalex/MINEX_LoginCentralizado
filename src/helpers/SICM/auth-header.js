export function authHeader() {
  const token = localStorage.getItem("InternalToken");
  if (token) {
    return { SessionToken: token };
  }

  return {};
}

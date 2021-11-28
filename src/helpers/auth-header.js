export function authHeader() {
  const token = localStorage.getItem("SessionToken");
  if (token) {
    return { SessionToken: token };
  }

  return {};
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("SessionToken");
        localStorage.removeItem("user");
        // return Promise.reject("La sesión ha caducado");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    const token = response.headers.get("SessionToken");
    if (token) localStorage.setItem("SessionToken", token);
    return data;
  });
}

export function handleResponseInternal(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("SessionToken");
        localStorage.removeItem("InternalToken");
        localStorage.removeItem("user");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    localStorage.setItem("InternalToken", response.headers.get("SessionToken"));
    return data;
  });
}

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function tokenHasExpired() {
  try {
    const token = localStorage.getItem("SessionToken");
    const dataToken = parseJwt(token);
    return Date.now() >= dataToken.exp * 1000;
  } catch (error) {
    return true;
  }
}

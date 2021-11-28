function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("InternalToken");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    if (response.headers.get("SessionToken") !== null)
      localStorage.setItem("InternalToken", response.headers.get("SessionToken"));
    return data;
  });
}

export { handleResponse };
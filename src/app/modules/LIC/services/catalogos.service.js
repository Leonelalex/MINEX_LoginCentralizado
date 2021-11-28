import { API_LIC } from "../constants";
import { handleResponse } from "../../../../helpers/";

export function authHeader() {
  const token = localStorage.getItem("InternalToken");
  if (token) {
    return { SessionToken: token };
  }

  return {};
}

async function getMenus() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Catalogo/Menus`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getPermitions() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Catalogo/Permitions`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

export const catalogoService = {
  getMenus,
  getPermitions,
};

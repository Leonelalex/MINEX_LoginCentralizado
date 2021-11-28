import { API_LIC } from "../constants";
import { handleResponse } from "../../../../helpers/";

export function authHeader() {
  const token = localStorage.getItem("InternalToken");
  if (token) {
    return { SessionToken: token };
  }

  return {};
}

async function getUsers({ page, size }) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/User/All?PageNumber=${page}&PageSize=${size}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getRoles() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(`${API_LIC.service}/Role/All`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function getRolesSystem(systemId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Role?sistemId=${systemId}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getSystems() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(`${API_LIC.service}/System`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function updateSystem(systemId, system) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
    body: JSON.stringify(system),
  };

  const response = await fetch(
    `${API_LIC.service}/System?sistemId=${systemId}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getMenusRole(roleId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Role/menu?idrol=${roleId}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getPermitionsRole(roleId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Role/permisos?idrol=${roleId}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function createRole(role) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
    body: JSON.stringify(role),
  };

  const response = await fetch(`${API_LIC.service}/Role`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function updateRole(role, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
    body: JSON.stringify(role),
  };

  const response = await fetch(
    `${API_LIC.service}/Role?idrole=${id}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getCountries() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Catalogo/paises`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getStates(country) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Catalogo/divisiones?idPais=${country}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getCities(state) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };
  const response = await fetch(
    `${API_LIC.service}/Catalogo/ciudades?idDivision=${state}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function createUser(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${API_LIC.service}/User`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function updateUser(user, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${API_LIC.service}/User/${id}`, requestOptions);
  const data = await handleResponse(response);
  return data;
}

async function removeUser(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_LIC.system,
    },
  };

  const response = await fetch(
    `${API_LIC.service}/User?iduser=${id}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

export const userService = {
  getUsers,
  getRoles,
  getSystems,
  getRolesSystem,
  updateSystem,
  getMenusRole,
  getPermitionsRole,
  createRole,
  updateRole,
  getCountries,
  getStates,
  getCities,
  createUser,
  updateUser,
  removeUser,
};

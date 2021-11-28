import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";

function getFormData() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  return fetch(`${API_SICM.service}/catalogos/catalogos`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function getSituacion() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };
  return fetch(`${API_SICM.service}/catalogos/situacion/all`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function updateSituacion(situacion, codSituacion) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(situacion),
  };

  return fetch(
    `${API_SICM.service}/catalogos/situacion/${codSituacion}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function addSituacion(situacion) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(situacion),
  };

  return fetch(`${API_SICM.service}/catalogos/situacion`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function deleteSituacion(codSituacion) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  return fetch(
    `${API_SICM.service}/catalogos/situacion/${codSituacion}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => error);
}

function getEstados() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Conten-type": "aplication/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };
  return fetch(`${API_SICM.service}/catalogos/estatus/all`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function updateEstado(estatus, codigo) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(estatus),
  };

  return fetch(
    `${API_SICM.service}/catalogos/estatus/${codigo}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function deleteEstado(codigo) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  return fetch(
    `${API_SICM.service}/catalogos/estatus/${codigo}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => error);
}

function addEstado(estatus) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(estatus),
  };

  return fetch(`${API_SICM.service}/catalogos/estatus`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function getAccion() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };
  return fetch(`${API_SICM.service}/catalogos/accion/all`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function updateAccion(situacion, codSituacion) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(situacion),
  };

  return fetch(
    `${API_SICM.service}/catalogos/accion/${codSituacion}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function addAccion(situacion) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(situacion),
  };

  return fetch(`${API_SICM.service}/catalogos/accion`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function deleteAccion(codSituacion) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  return fetch(
    `${API_SICM.service}/catalogos/accion/${codSituacion}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => error);
}

function getParametros() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };
  return fetch(`${API_SICM.service}/catalogos/param/all`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function updateParametro(codigo, parametro) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(parametro),
  };
  return fetch(
    `${API_SICM.service}/catalogos/param/${codigo}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

export const formData = {
  getFormData,
  getSituacion,
  updateSituacion,
  addSituacion,
  deleteSituacion,
  getEstados,
  updateEstado,
  deleteEstado,
  addEstado,
  getAccion,
  updateAccion,
  addAccion,
  deleteAccion,
  getParametros,
  updateParametro,
};

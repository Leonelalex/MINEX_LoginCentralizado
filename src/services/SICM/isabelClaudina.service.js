import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";

function getAlerts({ page, size, body }) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(body),
  };
  return fetch(
    `${API_SICM.service}/isabelclaudina/alertas?PageNumber=${page}&PageSize=${size}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function getActiveAlerts({ page, size }) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(alert),
  };
  return fetch(
    `${API_SICM.service}/isabelclaudina/alerta/porActivar?PageNumber=${page}&PageSize=${size}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function getAlert(page, size) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(alert),
  };
  return fetch(
    `${API_SICM.service}/isabelclaudina/all?PageNumber=${page}&PageSize=${size}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function activateAlert(code, alert) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(alert),
  };
  return fetch(
    `${API_SICM.service}/isabelclaudina/activar/${code}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function editDifusion(code, alert) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(alert),
  };
  return fetch(
    `${API_SICM.service}/isabelclaudina/difundir/${code}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

export const isabelClaudinaService = {
  getAlerts,
  getActiveAlerts,
  getAlert,
  activateAlert,
  editDifusion,
};

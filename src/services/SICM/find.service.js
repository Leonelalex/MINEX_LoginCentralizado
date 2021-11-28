import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";

function findPerson(filter,page,size) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(filter),
  };
  return fetch(`${API_SICM.service}/search/persona?PageNumber=${page}&PageSize=${size}`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
  
}

function getAlert(alertCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };
  return fetch(`${API_SICM.service}/search/alerta/${alertCode}`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

export const findService = { findPerson, getAlert };

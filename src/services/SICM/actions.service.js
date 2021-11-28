import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";

function notificarAB(codigoAlerta, body) {
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
    `${API_SICM.service}/accion/notificar/${codigoAlerta}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);

  // const response = await fetch(
  //   `${API_SICM.service}/accion/notificar/${codigoAlerta}`,
  //   requestOptions
  // );
  // const data = await handleResponse(response);
  // return data;
}

function avistamientoAB(codigoAlerta, body) {
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
    `${API_SICM.service}/accion/avistamiento/${codigoAlerta}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

async function desactivarAB(codigoAlerta, body) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${API_SICM.service}/albakeneth/desactivar/${codigoAlerta}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function situacionAB(codigoAlerta, body) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${API_SICM.service}/accion/situacion/${codigoAlerta}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function getTopActions({ page, size, body }) {
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
    `${API_SICM.service}/accion/ultimas?PageNumber=${page}&PageSize=${size}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

export const actionsService = {
  notificarAB,
  avistamientoAB,
  desactivarAB,
  situacionAB,
  getTopActions,
};

import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";
import { fileService } from "./";

async function createAlert(alert) {
  const newAlert = { ...alert };
  let imagesNames = null;
  let boletinNames = null;

  try {
    await fileService.sendAdjunto(newAlert.oficio.file, newAlert.codigoAlerta);
    imagesNames = await fileService.sendImagesCreateAB(
      newAlert.boletines,
      "foto"
    );
    boletinNames = await fileService.sendImagesCreateAB(
      newAlert.boletines,
      "boletin"
    );
  } catch (error) {
    throw error;
  }

  const fechaHora = `${newAlert.fecha}T00:00:00.000Z`;
  newAlert.oficio = newAlert.codigoAlerta + ".pdf";
  newAlert.misiones = newAlert.misionesArray;
  newAlert.codigoMunicipio = Number.parseInt(newAlert.codigoMunicipio);
  delete newAlert.country;
  delete newAlert.state;
  delete newAlert.fecha;
  delete newAlert.paises;
  delete newAlert.misionesArray;

  let indexImg = 0;
  let indexBoletin = 0;
  newAlert.boletines = newAlert.boletines.map((boletin) => {
    const newBoletin = { ...boletin };
    delete newBoletin.show;
    if (newBoletin.edad === "") delete newBoletin.edad;
    if (newBoletin.estatura === "") delete newBoletin.estatura;

    return {
      ...newBoletin,
      fechaHora: fechaHora,
      foto: newBoletin.foto !== null ? imagesNames[indexImg++] : "",
      boletin: newBoletin.boletin !== null ? boletinNames[indexBoletin++] : "",
    };
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(newAlert),
  };

  return fetch(`${API_SICM.service}/albakeneth/alerta`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

async function updateAlert(alert, code) {
  if (alert.oficio.file) {
    await fileService.sendAdjunto(alert.oficio.file, alert.codigoAlerta);
    alert.oficio = alert.codigoAlerta + ".pdf";
  }
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(alert),
  };

  return fetch(`${API_SICM.service}/albakeneth/alerta/${code}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => error);
}

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
    `${API_SICM.service}/albakeneth/alertas?PageNumber=${page}&PageSize=${size}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => data);
}

function deleteBoletin(code) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  return fetch(`${API_SICM.service}/albakeneth/boletin/${code}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => error);
}

function updateBoletin(boletin, code) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(boletin),
  };

  return fetch(`${API_SICM.service}/albakeneth/boletin/${code}`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function addBoletin(boletin, code) {
  const newBoletin = { ...boletin };

  if (newBoletin.edad === "") delete newBoletin.edad;
  if (newBoletin.estatura === "") delete newBoletin.estatura;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: JSON.stringify(newBoletin),
  };

  return fetch(`${API_SICM.service}/albakeneth/boletin/${code}`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

export const albaKenethService = {
  createAlert,
  getAlerts,
  updateAlert,
  addBoletin,
  deleteBoletin,
  updateBoletin,
};

import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";

async function digracomReport() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  const response = await fetch(
    `${API_SICM.auxService}/reportesAK/estatusAnio`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function activadasMes(year) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  const response = await fetch(
    `${API_SICM.auxService}/reportesAK/activadasMes/${year}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}

async function desactivadasMes(year) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      sistemId: API_SICM.system,
    },
  };

  const response = await fetch(
    `${API_SICM.auxService}/reportesAK/desactivadasMes/${year}`,
    requestOptions
  );
  const data = await handleResponse(response);
  return data;
}
export const reports = {
  digracomReport,
  activadasMes,
  desactivadasMes,
};

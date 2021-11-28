import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";

function getBitacora(code) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
            sistemId: API_SICM.system,
        }
    };
    return fetch(
        `${API_SICM.service}/albakeneth/bitacora/${code}`,
        requestOptions
    )
        .then(handleResponse)
        .then((data) => data);
}

function getBitacoraIsabel(code) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
            sistemId: API_SICM.system,
        }
    };
    return fetch(
        `${API_SICM.service}/isabelclaudina/bitacora/${code}`,
        requestOptions
    )
        .then(handleResponse)
        .then((data) => data);
}

export const bitacoraService = { getBitacora, getBitacoraIsabel };

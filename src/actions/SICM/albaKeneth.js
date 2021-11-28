import { albaKenethConstants, alertConstants } from "../../constants/SICM";
import { albaKenethService } from "../../services/SICM";

function addAlert(alert) {
  return (dispatch) => {
    dispatch({ type: albaKenethConstants.ADDALERT_REQUEST });
    albaKenethService
      .createAlert(alert)
      .then(
        (data) => {
          dispatch({
            type: albaKenethConstants.ADDALERT_SUCCESS,
            payload: alert,
          });
          dispatch({
            type: alertConstants.SUCCESS,
            payload: "Alerta creada con éxito",
          });
        },
        (error) => {
          dispatch({
            type: albaKenethConstants.ADDALERT_ERROR,
            payload: error.toString(),
          });
          dispatch({ type: alertConstants.ERROR, payload: error.toString() });
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
        dispatch({
          type: albaKenethConstants.ADDALERT_ERROR,
          payload: error.toString(),
        });
        dispatch({ type: alertConstants.ERROR, payload: error.toString() });
      });
  };
}

function getAlerts({ page, size, body }) {
  return (dispatch) => {
    dispatch({ type: albaKenethConstants.GETALL_REQUEST });
    albaKenethService
      .getAlerts({ page, size, body })
      .then(
        (alerts) => {
          dispatch({
            type: albaKenethConstants.GETALL_SUCCESS,
            payload: alerts,
          });
        },
        (error) => {
          dispatch({ type: albaKenethConstants.GETALL_ERROR, payload: error });
        }
      )
      .catch((error) => {
        dispatch({ type: albaKenethConstants.GETALL_ERROR, payload: error });
      });
  };
}

function editMode(alert) {
  return { type: albaKenethConstants.ACTIVE_EDIT_MODE, payload: alert };
}

function updateAlert(alert) {
  return { type: albaKenethConstants.PUTALERT_SUCCESS, payload: { ...alert } };
}

function addBoletin(codigo, boletin) {
  return {
    type: albaKenethConstants.ADDBOLETIN_SUCCESS,
    payload: { codigo, boletin },
  };
}

function updateBoletin(codigo, boletin) {
  return {
    type: albaKenethConstants.UPDTATEBOLETIN_SUCCESS,
    payload: { codigo, boletin },
  };
}

function deleteBoletin(codigo, codigoBoletin) {
  return {
    type: albaKenethConstants.DELETEBOLETIN_SUCCESS,
    payload: { codigo, codigoBoletin },
  };
}

function searchAlert(alert) {
  return { type: albaKenethConstants.SEARCH_ALERT, payload: alert };
}

export const albaKenethAction = {
  addAlert,
  getAlerts,
  editMode,
  updateAlert,
  addBoletin,
  deleteBoletin,
  updateBoletin,
  searchAlert,
};

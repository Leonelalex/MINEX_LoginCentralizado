import { isabelClaudinaConstants } from "../../constants/SICM";
import { isabelClaudinaService } from "../../services/SICM";

function getAlerts({ page, size, body }) {
  return (dispatch) => {
    dispatch({ type: isabelClaudinaConstants.GETALL_REQUEST });
    isabelClaudinaService
      .getAlerts({ page, size, body })
      .then(
        (alerts) => {
          dispatch({
            type: isabelClaudinaConstants.GETALL_SUCCESS,
            payload: alerts,
          });
        },
        (error) => {
          dispatch({
            type: isabelClaudinaConstants.GETALL_ERROR,
            payload: error,
          });
        }
      )
      .catch((error) => {
        dispatch({
          type: isabelClaudinaConstants.GETALL_ERROR,
          payload: error,
        });
      });
  };
}

function getActiveAlerts({ page, size }) {
  return (dispatch) => {
    dispatch({ type: isabelClaudinaConstants.GETACTIVE_REQUEST });
    isabelClaudinaService
      .getActiveAlerts({ page, size })
      .then(
        (alerts) => {
          dispatch({
            type: isabelClaudinaConstants.GETACTIVE_SUCCESS,
            payload: alerts,
          });
        },
        (error) => {
          dispatch({
            type: isabelClaudinaConstants.GETACTIVE_ERROR,
            payload: error,
          });
        }
      )
      .catch((error) => {
        dispatch({
          type: isabelClaudinaConstants.GETACTIVE_ERROR,
          payload: error,
        });
      });
  };
}

function setActiveAlert(index) {
  return { type: isabelClaudinaConstants.SET_ACTIVE_ALERT, payload: index };
}

function searchAlert(alert) {
  return { type: isabelClaudinaConstants.SEARCH_ALERT, payload: alert };
}

export const isabelClaudinaActions = {
  getAlerts,
  getActiveAlerts,
  setActiveAlert,
  searchAlert,
};

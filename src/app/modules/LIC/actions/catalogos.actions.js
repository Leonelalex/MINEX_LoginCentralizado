import { catalogoConstants } from "../constants";
import { catalogoService } from "../services";

function getMenus() {
  return (dispatch) => {
    dispatch({ type: catalogoConstants.GETMENUS_REQUEST });
    catalogoService.getMenus().then(
      (menus) => {
        dispatch({
          type: catalogoConstants.GETMENUS_SUCCESS,
          payload: menus,
        });
      },
      (error) => {
        dispatch({
          type: catalogoConstants.GETMENUS_ERROR,
          payload: error.toString(),
        });
      }
    );
  };
}

function getPermitions() {
  return (dispatch) => {
    dispatch({ type: catalogoConstants.GETPERMITIONS_SUCCESS });
    catalogoService.getPermitions().then(
      (menus) => {
        dispatch({
          type: catalogoConstants.GETPERMITIONS_SUCCESS,
          payload: menus,
        });
      },
      (error) => {
        dispatch({
          type: catalogoConstants.GETPERMITIONS_ERROR,
          payload: error.toString(),
        });
      }
    );
  };
}

export const catalogosActions = {
  getMenus,
  getPermitions,
};

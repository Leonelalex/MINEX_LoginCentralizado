import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";

function login(username, password) {
  return (dispatch) => {
    dispatch({ type: userConstants.LOGIN_REQUEST, username });
    userService
      .login(username, password)
      .then(
        (user) => {
          dispatch(
            alertActions.success(
              `Bienvenido ${user.firstName} ${user.lastName}`
            )
          );
          dispatch({ type: userConstants.LOGIN_SUCCESS, payload: user });
        },
        (error) => {
          dispatch({
            type: userConstants.LOGIN_FAILURE,
            payload: error.toString(),
          });
          dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((error) => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          payload: error.toString(),
        });
        dispatch(alertActions.error(error.toString()));
      });
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function userInfo() {
  return (dispatch) => {
    dispatch({ type: userConstants.GETUSER_REQUEST });
    userService
      .userInfo()
      .then(
        (user) => {
          dispatch({ type: userConstants.GETUSER_SUCCESS, payload: user });
        },
        (error) => {
          dispatch({
            type: userConstants.GETUSER_FAILURE,
            payload: error.toString(),
          });
          dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((error) => {
        dispatch({
          type: userConstants.GETUSER_FAILURE,
          payload: error.toString(),
        });
        dispatch(alertActions.error(error.toString()));
      });
  };
}

function setCurrentUrl(url) {
  return { type: userConstants.SET_CURRENT_URL, payload: url };
}

function setSubMenus(submenus) {
  return { type: userConstants.SET_SUBMENUS, payload: submenus };
}

function setTokenRequest() {
  return { type: userConstants.SET_TOKEN_REQUEST };
}

export const userActions = {
  login,
  logout,
  userInfo,
  setCurrentUrl,
  setSubMenus,
  setTokenRequest,
};

import { catalogoConstants } from "../app/modules/LIC/constants";

const initalFormDataState = {
  loadingMenu: false,
  loadingPermmitions: false,
  menus: [],
  permitions: [],
  error: "",
  hasError: false,
};

export function licData(state = initalFormDataState, action) {
  switch (action.type) {
    case catalogoConstants.GETMENUS_REQUEST:
      return { ...state, loadingMenu: true };
    case catalogoConstants.GETMENUS_SUCCESS:
      return { ...state, loadingMenu: false, menus: action.payload };
    case catalogoConstants.GETMENUS_ERROR:
      return {
        ...state,
        loadingMenu: false,
        hasError: true,
        error: action.payload,
      };
    case catalogoConstants.GETPERMITIONS_REQUEST:
      return { ...state, loadingPermmitions: true };
    case catalogoConstants.GETPERMITIONS_SUCCESS:
      return {
        ...state,
        loadingPermmitions: false,
        permitions: action.payload,
      };
    case catalogoConstants.GETPERMITIONS_ERROR:
      return {
        ...state,
        loadingPermmitions: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
}

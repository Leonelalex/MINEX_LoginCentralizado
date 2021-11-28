import { isabelClaudinaConstants } from "../constants/SICM";

const initialIsabelClaudinaState = {
  loading: false,
  alerts: [],
  total: 0,
  hasError: false,
  error: "",

  activeAlerts: [],
  loadingActive: false,
  totalActive: 0,
};

export function isabelClaudina(state = initialIsabelClaudinaState, action) {
  switch (action.type) {
    case isabelClaudinaConstants.GETALL_REQUEST:
      return { ...state, loading: true };
    case isabelClaudinaConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        alerts: action.payload.alertas,
        total: action.payload.total,
      };
    case isabelClaudinaConstants.GETALL_ERROR:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };
    case isabelClaudinaConstants.GETACTIVE_REQUEST:
      return { ...state, loadingActive: true };
    case isabelClaudinaConstants.GETACTIVE_SUCCESS:
      return {
        ...state,
        loadingActive: false,
        activeAlerts: action.payload.alertas,
        totalActive: action.payload.total,
      };
    case isabelClaudinaConstants.GETACTIVE_ERROR:
      return { ...state, hasError: true, loadingActive: false };
    case isabelClaudinaConstants.SET_ACTIVE_ALERT:
      state.activeAlerts.splice(action.payload, 1);
      return { ...state };

    case isabelClaudinaConstants.SEARCH_ALERT: {
      return { ...state, total: 1, alerts: [action.payload] };
    }
    default:
      return state;
  }
}

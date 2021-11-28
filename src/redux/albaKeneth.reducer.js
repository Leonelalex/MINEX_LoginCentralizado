import { albaKenethConstants } from '../constants/SICM';

const initialAlbaKenethState = {
    loading: false,
    alerts: [],
    total: 0,
    hasError: false,
    error: "",
    editAlert: null,
    editMode: false
}

export function albaKeneth(state = initialAlbaKenethState, action) {
    switch (action.type) {
        case albaKenethConstants.GETALL_REQUEST:
            return { ...state, loading: true }
        case albaKenethConstants.GETALL_SUCCESS:
            return { alerts: action.payload.alertas, total: action.payload.total }
        case albaKenethConstants.GETALL_ERROR:
            return { hasError: true, error: action.payload }
        case albaKenethConstants.ADDALERT_REQUEST:
            return { ...state, loading: true }
        case albaKenethConstants.ADDALERT_SUCCESS:
            return { ...state, created: true, loading: false }
        case albaKenethConstants.ADDALERT_ERROR:
            return { ...state, hasError: true, error: action.payload, loading: false }
        case albaKenethConstants.ACTIVE_EDIT_MODE:
            return { ...state, editAlert: action.payload, editMode: true };
        case albaKenethConstants.PUTALERT_SUCCESS:
            const indexAlert = state.alerts.findIndex((alert) => alert.codigo === action.payload.codigo);
            state.alerts[indexAlert] = action.payload;
            return { ...state };
        case albaKenethConstants.ADDBOLETIN_SUCCESS: {
            const alert = state.alerts.find((alert) => alert.codigo === action.payload.codigo);
            alert.sicmBoletines.push(action.payload.boletin);
            return { ...state };
        }
        case albaKenethConstants.DELETEBOLETIN_SUCCESS: {
            const alert = state.alerts.find((alert) => alert.codigo === action.payload.codigo);
            // eslint-disable-next-line
            const index = alert.sicmBoletines.findIndex((boletin) => boletin.codigoBoletin == action.payload.codigoBoletin);
            alert.sicmBoletines.splice(index, 1);
            return { ...state };
        }
        case albaKenethConstants.UPDTATEBOLETIN_SUCCESS: {
            const alert = state.alerts.find((alert) => alert.codigo === action.payload.codigo);
            // eslint-disable-next-line
            const index = alert.sicmBoletines.findIndex((boletin) => boletin.codigoBoletin == action.payload.boletin.codigoBoletin);
            alert.sicmBoletines[index] = action.payload.boletin;
            return { ...state };
        }
        case albaKenethConstants.SEARCH_ALERT: {
            return { ...state, total: 1, alerts: [action.payload] };
        }
        default:
            return state;
    }
}
import { userConstants } from '../constants';

const userInitialState = {
    loading: false,
    user: undefined,
    error: undefined,
    actualURL: window.location.href,
    submenus: [],
    loadingToken: true,
}

export function user(state = userInitialState, action) {
    switch (action.type) {
        case userConstants.GETUSER_REQUEST:
            return { ...state, submenus: state.submenus, loading: true };
        case userConstants.GETUSER_SUCCESS:
            return { ...state, submenus: state.submenus, user: action.payload };
        case userConstants.GETUSER_FAILURE:
            return { ...state, submenus: state.submenus, error: action.payload, hasError: true };
        case userConstants.SET_CURRENT_URL:
            return { ...state, actualURL: action.payload };
        case userConstants.SET_TOKEN_REQUEST:
            return { ...state, loadingToken: true };
        case userConstants.SET_SUBMENUS:
            return { ...state, submenus: action.payload, loadingToken: false };
        default:
            return state
    }
}
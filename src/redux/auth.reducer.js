import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userConstants } from '../constants';

const initialAuthState = {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: ""
};


export const auth = persistReducer(
    { storage, key: "v713-demo1-auth", whitelist: ["user", "authToken"] },
    (state = initialAuthState, action) => {
        switch (action.type) {
            case userConstants.LOGIN_REQUEST:
                return { loading: true }
            case userConstants.LOGIN_SUCCESS:
                return { user: action.payload }
            case userConstants.LOGIN_FAILURE:
                return { error: action.payload }
            default:
                return state;
        }
    }
);
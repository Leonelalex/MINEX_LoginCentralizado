import { alertConstants } from '../constants';
// import { toast } from 'react-toastify';

function success(message) {
    // toast.success(message);
    return { type: alertConstants.SUCCESS, payload: message };
}

function error(message) {
    // toast.error(message);
    return { type: alertConstants.ERROR, payload: message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    success,
    error,
    clear
};
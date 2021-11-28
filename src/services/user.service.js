import { apiConstants } from '../constants';
import { authHeader, encryptAES526, handleResponse, handleResponseInternal } from '../helpers';

function login(user, password) {

    user = encryptAES526(user);
    password = encryptAES526(password);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                user,
                password,
                systemId: apiConstants.SSO_ID
            }
        )
    };

    return fetch(`${apiConstants.SSO_SERVICE}/Admin/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function userInfo() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify({
            systemId: apiConstants.SSO_ID
        })
    }

    return fetch(`${apiConstants.SSO_SERVICE}/Admin/user`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function getToken(systemId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify({
            systemId
        })
    }

    return fetch(`${apiConstants.SSO_SERVICE}/Session/sistem`, requestOptions)
        .then(handleResponseInternal)
        .then(token => {
            return token.menus;
        });
}

export const userService = {
    login,
    logout,
    userInfo,
    getToken
};
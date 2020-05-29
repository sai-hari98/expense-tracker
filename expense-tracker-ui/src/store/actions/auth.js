import actionTypes from './actionTypes';

export const setToken = (token) => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: {
            token: token
        }
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}
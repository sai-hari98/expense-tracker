import actionTypes from './actionTypes';

export const setToken = (token, userId) => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}
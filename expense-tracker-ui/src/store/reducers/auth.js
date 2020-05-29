import actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    loggedIn: false
}

const setToken = (token, loggedIn) => {
    if (loggedIn) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

const reducer = (state = initialState, action) => {
    let stateCopy = { ...state };
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            stateCopy.loggedIn = true;
            setToken(action.payload.token, true);
            stateCopy.token = action.payload.token;
            return stateCopy;
        case actionTypes.LOGOUT:
            stateCopy.loggedIn = false;
            stateCopy.token = null;
            setToken(null, false);
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;
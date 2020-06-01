import actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    loggedIn: false,
    userId: null
}

const reducer = (state = initialState, action) => {
    let stateCopy = { ...state };
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            stateCopy.loggedIn = true;
            stateCopy.token = action.payload.token;
            stateCopy.userId = action.payload.userId;
            return stateCopy;
        case actionTypes.LOGOUT:
            stateCopy.loggedIn = false;
            stateCopy.token = null;
            stateCopy.userId = null;
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;
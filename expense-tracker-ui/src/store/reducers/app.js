import actionTypes from '../actions/actionTypes';
const initialState = {
    darkMode: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DARK_MODE:
            let stateCopy = { ...state };
            let darkMode = stateCopy.darkMode;
            stateCopy.darkMode = !darkMode;
            return stateCopy;
        default:
            return state;
    }
}

export default reducer;
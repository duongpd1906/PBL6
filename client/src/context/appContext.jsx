import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

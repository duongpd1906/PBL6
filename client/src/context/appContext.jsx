import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import axios from "axios";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGOUT_USER,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    GET_ALL_POSTS_BEGIN,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_ERROR,
    CREATE_POST_BEGIN,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
    UPDATE_AVATAR_BEGIN,
    UPDATE_AVATAR_ERROR,
    UPDATE_AVATAR_SUCCESS,
    GET_ALL_USER_POSTS_BEGIN,
    GET_ALL_USER_POSTS_SUCCESS,
    GET_ALL_USER_POSTS_ERROR,
    GET_USER_PROFILE_BEGIN,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    listsPost: [],
    userProfile: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // axios
    const authFetch = axios.create({
        baseURL: "/api",
    });
    // request

    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // response

    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const registerUser = async ({ currentUser }) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post(
                "/api/auth/register",
                currentUser
            );
            const { user, token } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                },
            });
            addUserToLocalStorage({ user, token });
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const loginUser = async ({ currentUser }) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const { data } = await axios.post("/api/auth/login", currentUser);
            const { user, token } = data;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            });

            addUserToLocalStorage({ user, token });
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const getProfileById = async ( userId ) => {
        dispatch({ type: GET_USER_PROFILE_BEGIN });
        try {
            const { data } = await authFetch.get(`/user/${userId}`);
            var { user, userProfile } = data
            userProfile.username = user.username
            userProfile.avatar = user.avatar
            userProfile.email = user.email
            dispatch({
                type: GET_USER_PROFILE_SUCCESS,
                payload: { userProfile: userProfile },
            });

        } catch (error) {
            dispatch({
                type: GET_USER_PROFILE_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const getAllPosts = async () => {
        dispatch({ type: GET_ALL_POSTS_BEGIN });
        try {
            const { data } = await axios.get("/api/post");
            dispatch({
                type: GET_ALL_POSTS_SUCCESS,
                payload: { listsPost: data },
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_POSTS_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    const createPost = async (post) => {
        dispatch({ type: CREATE_POST_BEGIN });
        try {
            await authFetch.post("/post", post);
            dispatch({ type: CREATE_POST_SUCCESS });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: CREATE_POST_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const updateAvatar = async (file) => {
        dispatch({ type: UPDATE_AVATAR_BEGIN });
        try {
            const res = await authFetch.patch(
                `/user/avatar`,
                file
            );
            const user = res.data;
            dispatch({
                type: UPDATE_AVATAR_SUCCESS,
                payload: { user: user },
            });
            localStorage.setItem("user", JSON.stringify(user));
            window.location.reload(false)
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: UPDATE_AVATAR_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                logoutUser,
                getProfileById,
                getAllPosts,
                createPost,
                updateAvatar,
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

import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
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
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_ERROR,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values!",
        };
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        };
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "User Created! Redirecting...",
        };
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
        };
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            user_ava: action.payload.user.avatar,
            token: action.payload.token,
            showAlert: true,
            alertType: "success",
            alertText: "Login Successful! Redirecting...",
        };
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    if (action.type === GET_ALL_POSTS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === GET_ALL_POSTS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            listsPost: action.payload.listsPost,
        };
    }

    if (action.type === GET_ALL_POSTS_ERROR) {
        return {
            ...state,
            isLoading: false,
        };
    }

    if (action.type === CREATE_POST_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === CREATE_POST_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "New Post Created!",
        };
    }

    if (action.type === CREATE_POST_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    if (action.type === UPDATE_AVATAR_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === UPDATE_AVATAR_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Update avatar success",
            user_ava: action.payload.user_ava,
        }
    }

    if (action.type === UPDATE_AVATAR_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }

    throw new Error(`no such action : ${action.type}`);
};

export default reducer;

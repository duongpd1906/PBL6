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
	GET_USER_PROFILE_BEGIN,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_ERROR,
	GET_ALL_USERS_BEGIN,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_ERROR,
	SEND_INVITATION_BEGIN,
	SEND_INVITATION_SUCCESS,
	SEND_INVITATION_ERROR,
	ACCEPT_INVITATION_BEGIN,
	ACCEPT_INVITATION_SUCCESS,
	ACCEPT_INVITATION_ERROR,
	GET_CONVERSATION_BEGIN,
	GET_CONVERSATION_SUCCESS,
	GET_CONVERSATION_ERROR,
	GET_LIST_CONVERSATIONS_BEGIN,
    GET_LIST_CONVERSATIONS_SUCCESS,
    GET_LIST_CONVERSATIONS_ERROR,
	GET_COMMENTS_OF_POST_BEGIN,
	GET_COMMENTS_OF_POST_SUCCESS,
	GET_COMMENTS_OF_POST_ERROR,
	GET_COMMENTS_OF_COMMENT_BEGIN,
	GET_COMMENTS_OF_COMMENT_SUCCESS,
	GET_COMMENTS_OF_COMMENT_ERROR,
	COMMENT_POST_BEGIN,
	COMMENT_POST_SUCCESS,
	COMMENT_POST_ERROR,
	CREATE_LIKE_BEGIN,
	CREATE_LIKE_SUCCESS,
	CREATE_LIKE_ERROR,
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

	if (action.type === GET_USER_PROFILE_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_USER_PROFILE_SUCCESS) {
		return {
			...state,
			isLoading: false,
			userProfile: action.payload.userProfile,
		};
	}
	if (action.type === GET_USER_PROFILE_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === GET_ALL_USERS_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_ALL_USERS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			listUsers: action.payload.listUsers,
		};
	}
	if (action.type === GET_ALL_USERS_ERROR) {
		return {
			...state,
			isLoading: false,
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
			listPosts: action.payload.listPosts,
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
			user: action.payload.user,
		};
	}

	if (action.type === UPDATE_AVATAR_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}

	if (action.type === SEND_INVITATION_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === SEND_INVITATION_SUCCESS) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === SEND_INVITATION_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === ACCEPT_INVITATION_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === ACCEPT_INVITATION_SUCCESS) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === ACCEPT_INVITATION_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === GET_LIST_CONVERSATIONS_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_LIST_CONVERSATIONS_SUCCESS) {
		return {
			...state,
			isLoading: false,
            listConversations: action.payload.conversation,
            showAlert: true,
			alertType: "success",
			alertText: "get conversation success",
		};
	}

	if (action.type === GET_LIST_CONVERSATIONS_ERROR) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_CONVERSATION_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_CONVERSATION_SUCCESS) {
		return {
			...state,
			isLoading: false,
            conversation: action.payload.conversation,
            showAlert: true,
			alertType: "success",
			alertText: "get conversation success",
		};
	}

	if (action.type === GET_CONVERSATION_ERROR) {
		return {
			...state,
			isLoading: true,
		};
	}
	
	if (action.type === GET_COMMENTS_OF_POST_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_COMMENTS_OF_POST_SUCCESS) {
		return {
			...state,
			isLoading: false,
			commentsOfPost: action.payload.commentsOfPost
		};
	}

	if (action.type === GET_COMMENTS_OF_POST_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}
	
	if (action.type === GET_COMMENTS_OF_COMMENT_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === GET_COMMENTS_OF_COMMENT_SUCCESS) {
		return {
			...state,
			isLoading: false,
			commentsOfComment: action.payload.commentsOfComment
		};
	}

	if (action.type === GET_COMMENTS_OF_COMMENT_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === COMMENT_POST_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === COMMENT_POST_SUCCESS) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === COMMENT_POST_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === CREATE_LIKE_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (action.type === CREATE_LIKE_SUCCESS) {
		return {
			...state,
			isLoading: false,
		};
	}

	if (action.type === CREATE_LIKE_ERROR) {
		return {
			...state,
			isLoading: false,
		};
	}

	throw new Error(`no such action : ${action.type}`);
};

export default reducer;

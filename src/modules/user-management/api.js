import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./apiUrls.js";


export const signInApi = (data) => {
    return {
        url: API_URL.AUTH.SIGN_IN,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SIGN_IN_REQUEST, ACTION_TYPES.SIGN_IN_SUCCESS, ACTION_TYPES.SIGN_IN_FAILURE],
            data: data
        }
    };
};
export const signUpApi = (data) => {
    return {
        url: API_URL.AUTH.SIGN_UP,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SIGN_UP_REQUEST, ACTION_TYPES.SIGN_UP_SUCCESS, ACTION_TYPES.SIGN_UP_FAILURE],
            data: data
        }
    };
};

export const signUpVOApi = (data) => {
    return {
        url: API_URL.AUTH.SIGN_UP_VO,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SIGN_UP_VO_REQUEST, ACTION_TYPES.SIGN_UP_VO_SUCCESS, ACTION_TYPES.SIGN_UP_VO_FAILURE],
            data: data
        }
    };
};

export const signUpVUApi = (data) => {
    return {
        url: API_URL.AUTH.SIGN_UP_VU,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SIGN_UP_VU_REQUEST, ACTION_TYPES.SIGN_UP_VU_SUCCESS, ACTION_TYPES.SIGN_UP_VU_FAILURE],
            data: data
        }
    };
};

export const fetchOrgAdminsSagaApi = (email = "") => {
    let data = { email };
    return {
        url: API_URL.USER_MANAGEMENT.ORG_ADMINS,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.FETCH_ORG_ADMINS_REQUEST, ACTION_TYPES.FETCH_ORG_ADMINS_SUCCESS, ACTION_TYPES.FETCH_ORG_ADMINS_FAILURE],
            data
        }
    };
};
export const fetchCurrentUserAPI = () => {

    return {
        url: API_URL.USER_MANAGEMENT.GET_CURRENT_PROFILE,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.USER_PROFILE_REQUEST, ACTION_TYPES.USER_PROFILE_SUCCESS, ACTION_TYPES.USER_PROFILE_FAILURE]
        }
    };
};

export const fetchOrgListApi = () => {
    return {
        url: API_URL.USER_MANAGEMENT.ORG_LIST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_ORG_LIST_REQUEST, ACTION_TYPES.FETCH_ORG_LIST_SUCCESS, ACTION_TYPES.FETCH_ORG_LIST_FAILURE]
        }
    };
};

export const fetchOrgAdminDropdownApi = (data) => {
    return {
        url: API_URL.USER_MANAGEMENT.BY_ORG,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.FETCH_ADMIN_BY_ORG_REQUEST, ACTION_TYPES.FETCH_ADMIN_BY_ORG_SUCCESS, ACTION_TYPES.FETCH_ADMIN_BY_ORG_FAILURE],
            data
        }
    };
};

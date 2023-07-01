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
        url: API_URL.AUTH.SIGN_IN,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SIGN_UP_REQUEST, ACTION_TYPES.SIGN_UP_SUCCESS, ACTION_TYPES.SIGN_UP_FAILURE],
            data: data
        }
    };
};

export const fetchOrgAdminsSagaApi = (data) => {
    return {
        url: API_URL.AUTH.ORG_ADMINS,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.FETCH_ORG_ADMINS_REQUEST, ACTION_TYPES.FETCH_ORG_ADMINS_SUCCESS, ACTION_TYPES.FETCH_ORG_ADMINS_FAILURE],
            data
        }
    };
};
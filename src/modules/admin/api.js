
import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./urls";

export const fetchDashboardApi = () => {
    return {
        url: API_URL.DASHBOARD.STATS,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_DASHBOARD_STATS_REQUEST, ACTION_TYPES.FETCH_DASHBOARD_STATS_SUCCESS, ACTION_TYPES.FETCH_DASHBOARD_STATS_FAILURE]
        }
    };
};

export const usersListApi = (data) => {
    return {
        url: API_URL.USER.LIST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_USERS_LIST_REQUEST, ACTION_TYPES.FETCH_USERS_LIST_SUCCESS, ACTION_TYPES.FETCH_USERS_LIST_FAILURE],
            data
        }
    };
};

export const fetchUserByIdApi = (id) => {
    return {
        url: API_URL.USER.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_USER_BY_ID_REQUEST, ACTION_TYPES.FETCH_USER_BY_ID_SUCCESS, ACTION_TYPES.FETCH_USER_BY_ID_FAILURE]
        }
    };
};
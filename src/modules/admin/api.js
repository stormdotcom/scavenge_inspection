
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
//fetchDashboardSecondaryApi
export const fetchDashboardSecondaryApi = () => {
    return {
        url: API_URL.DASHBOARD.CARD,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_DASHBOARD_CARD_REQUEST, ACTION_TYPES.FETCH_DASHBOARD_CARD_SUCCESS, ACTION_TYPES.FETCH_DASHBOARD_CARD_FAILURE]
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

export const allowAccessApi = (id) => {
    let data = { id: id };
    return {
        url: API_URL.USER.ACCESS_CONTROL,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.ALLOW_ACCESS_REQUEST, ACTION_TYPES.ALLOW_ACCESS_SUCCESS, ACTION_TYPES.ALLOW_ACCESS_FAILURE],
            data
        }
    };
};

export const disAllowAccessApi = (id) => {
    let data = { id: id };
    return {
        url: API_URL.USER.ACCESS_CONTROL,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.DISALLOW_ACCESS_REQUEST, ACTION_TYPES.DISALLOW_ACCESS_SUCCESS, ACTION_TYPES.DISALLOW_ACCESS_FAILURE],
            data
        }
    };
};


export const updateUserDetailsApi = (data) => {
    return {
        url: API_URL.USER.UPDATE,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.UPDATE_USER_DETAILS_REQUEST, ACTION_TYPES.UPDATE_USER_DETAILS_SUCCESS, ACTION_TYPES.UPDATE_USER_DETAILS_FAILURE],
            data
        }
    };
};

export const resetPasswordApi = (data) => {
    return {
        url: API_URL.USER.PASSWORD_UPDATE,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.RESET_PASSWORD_REQUEST, ACTION_TYPES.RESET_PASSWORD_SUCCESS, ACTION_TYPES.RESET_PASSWORD_FAILURE],
            data
        }
    };
};

export const fetchVesselListsApi = (data) => {
    return {
        url: API_URL.VESSEL.LIST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_VESSEL_LIST_REQUEST, ACTION_TYPES.FETCH_VESSEL_LIST_SUCCESS, ACTION_TYPES.FETCH_VESSEL_LIST_FAILURE],
            data
        }
    };
};
export const fetchVesselByIdApi = (id) => {
    return {
        url: API_URL.VESSEL.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_VESSEL_BY_ID_REQUEST, ACTION_TYPES.FETCH_VESSEL_BY_ID_SUCCESS, ACTION_TYPES.FETCH_VESSEL_BY_ID_FAILURE]
        }
    };
};

export const orgListApi = (data) => {
    return {
        url: API_URL.ORG.LIST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_ORG_TABLE_REQUEST, ACTION_TYPES.FETCH_ORG_TABLE_SUCCESS, ACTION_TYPES.FETCH_ORG_TABLE_FAILURE],
            data
        }
    };
};

export const fetchOrgByIdApi = (id) => {
    return {
        url: API_URL.ORG.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_ORG_BY_ID_REQUEST, ACTION_TYPES.FETCH_ORG_BY_ID_SUCCESS, ACTION_TYPES.FETCH_ORG_BY_ID_FAILURE]
        }
    };
};

export const updateOrgApi = (data) => {
    return {
        url: API_URL.ORG.UPDATE,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.UPDATE_ORG_REQUEST, ACTION_TYPES.UPDATE_ORG_SUCCESS, ACTION_TYPES.UPDATE_ORG_FAILURE],
            data
        }
    };
};

export const fetchDashboardSubStatsApi = (data) => {
    return {
        url: API_URL.DASHBOARD.SUBSCRIPTION,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_DASHBOARD_SUB_STATS_REQUEST, ACTION_TYPES.FETCH_DASHBOARD_SUB_STATS_SUCCESS, ACTION_TYPES.FETCH_DASHBOARD_SUB_STATS_FAILURE],
            data
        }
    };
};

import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./urls";


export const fetchVesselListApi = () => {
    return {
        url: API_URL.DASHBOARD.VESSEL_LIST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_VESSEL_LIST_REQUEST, ACTION_TYPES.FETCH_VESSEL_LIST_SUCCESS, ACTION_TYPES.FETCH_VESSEL_LIST_FAILURE]
        }
    };
};

export const fetchVesselRequestListApi = () => {
    return {
        url: API_URL.DASHBOARD.PENDING_VESSEL_REQUEST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.VESSEL_REQUEST_LIST_REQUEST, ACTION_TYPES.VESSEL_REQUEST_LIST_SUCCESS, ACTION_TYPES.VESSEL_REQUEST_LIST_FAILURE]
        }
    };
};

export const approveVesselApi = (id) => {
    return {
        url: API_URL.DASHBOARD.APPROVE_REQUEST.replace(":id", id),
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.APPROVE_VESSEL_REQUEST, ACTION_TYPES.APPROVE_VESSEL_SUCCESS, ACTION_TYPES.APPROVE_VESSEL_FAILURE]
        }
    };
};
export const createVesselApi = (data) => {
    return {
        url: API_URL.DASHBOARD.CREATE_VESSEL,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.CREATE_VESSEL_REQUEST, ACTION_TYPES.CREATE_VESSEL_SUCCESS, ACTION_TYPES.CREATE_VESSEL_FAILURE],
            data
        }
    };
};

export const fetchVesselDetailListsApi = (data) => {
    return {
        url: API_URL.VESSELS.LIST,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST_REQUEST, ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST_SUCCESS, ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST_FAILURE],
            data
        }
    };
};

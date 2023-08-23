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

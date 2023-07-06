import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./urls";


export const fetchVesselInfoApi = () => {
    return {
        url: API_URL.PROFILE.VESSEL_INFO,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_VESSEL_DETAILS_REQUEST, ACTION_TYPES.FETCH_VESSEL_DETAILS_SUCCESS, ACTION_TYPES.FETCH_VESSEL_DETAILS_FAILURE]
        }

    };
};


export const updateVesselInfoApi = (data) => {
    return {
        url: API_URL.PROFILE.UPDATE_VESSEL_INFO,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.FETCH_VESSEL_DETAILS_REQUEST, ACTION_TYPES.FETCH_VESSEL_DETAILS_SUCCESS, ACTION_TYPES.FETCH_VESSEL_DETAILS_FAILURE],
            data
        }

    };
};


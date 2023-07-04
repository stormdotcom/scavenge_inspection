import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./urls";

export const showPredictionApi = (data) => {
    return {
        url: API_URL.VESSEL.SHOW_PREDICTION,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.SHOW_PREDICTIONS_REQUEST, ACTION_TYPES.SHOW_PREDICTIONS_SUCCESS, ACTION_TYPES.SHOW_PREDICTIONS_FAILURE],
            data
        }

    };
};

export const updateInspectionDetailsApi = (data) => {
    return {
        url: API_URL.VESSEL.UPDATE_INSPECTION_DETAILS,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.UPDATE_VESSEL_INSPECTION_REQUEST, ACTION_TYPES.UPDATE_VESSEL_INSPECTION_SUCCESS, ACTION_TYPES.UPDATE_VESSEL_INSPECTION_FAILURE],
            data
        }

    };
};

export const getInspectionDetailsApi = () => {
    return {
        url: API_URL.VESSEL.GET_INSPECTION_DETAILS,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST, ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS, ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE]
        }

    };
};



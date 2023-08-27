
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

import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { fetchDashboardApi } from "./api";
import { handleAPIRequest } from "../../utils/http";

export function* fetchDashboardSaga() {
    yield call(handleAPIRequest, fetchDashboardApi);
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_DASHBOARD_STATS, fetchDashboardSaga)

    ]);
}

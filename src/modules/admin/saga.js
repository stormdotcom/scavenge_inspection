import { all, call, select, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { fetchDashboardApi, fetchUserByIdApi, usersListApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getPagingInfo } from "./selectors";

export function* fetchDashboardSaga() {
    yield call(handleAPIRequest, fetchDashboardApi);
}

export function* fetchUsersListSaga() {
    const tablePagination = yield select(getPagingInfo);
    const payload = { ...tablePagination };
    yield call(handleAPIRequest, usersListApi, payload);
}

export function* fetchUserByIdSaga({ payload }) {
    yield call(handleAPIRequest, fetchUserByIdApi, payload);
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_DASHBOARD_STATS, fetchDashboardSaga),
        takeLatest(ACTION_TYPES.FETCH_USERS_LIST, fetchUsersListSaga),
        takeLatest(ACTION_TYPES.FETCH_USER_BY_ID, fetchUserByIdSaga)
    ]);
}

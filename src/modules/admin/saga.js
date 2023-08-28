import { all, call, fork, put, select, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES, fetchUserList } from "./actions";
import { allowAccessApi, disAllowAccessApi, fetchDashboardApi, fetchUserByIdApi, updateUserDetailsApi, usersListApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getPagingInfo } from "./selectors";
import { successNotify } from "../../utils/notificationUtils";

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

export function* allowAccessSaga({ payload }) {
    yield fork(handleAPIRequest, allowAccessApi, payload);
    const response = yield take([ACTION_TYPES.ALLOW_ACCESS_SUCCESS, ACTION_TYPES.ALLOW_ACCESS_FAILURE]);
    if (response.type === ACTION_TYPES.ALLOW_ACCESS_SUCCESS) {
        yield put(successNotify({ title: "Action Succeeded", message: "Enabled User access" }));
        yield put(fetchUserList());
    }
}

export function* disAllowAccessSaga({ payload }) {
    yield fork(handleAPIRequest, disAllowAccessApi, payload);
    const response = yield take([ACTION_TYPES.DISALLOW_ACCESS_SUCCESS, ACTION_TYPES.DISALLOW_ACCESS_FAILURE]);
    if (response.type === ACTION_TYPES.DISALLOW_ACCESS_SUCCESS) {
        yield put(successNotify({ title: "Action Succeeded", message: "Disabled User access" }));
        yield put(fetchUserList());
    }
}

export function* updateUserDetailsSaga({ payload }) {
    yield fork(handleAPIRequest, updateUserDetailsApi, payload);
    const response = yield take([ACTION_TYPES.UPDATE_USER_DETAILS_SUCCESS, ACTION_TYPES.UPDATE_USER_DETAILS_FAILURE]);
    if (response.type === ACTION_TYPES.UPDATE_USER_DETAILS_SUCCESS) {
        yield put(successNotify({ title: "Success", message: "User Details Updated" }));
    }
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_DASHBOARD_STATS, fetchDashboardSaga),
        takeLatest(ACTION_TYPES.FETCH_USERS_LIST, fetchUsersListSaga),
        takeLatest(ACTION_TYPES.FETCH_USER_BY_ID, fetchUserByIdSaga),
        takeLatest(ACTION_TYPES.ALLOW_ACCESS, allowAccessSaga),
        takeLatest(ACTION_TYPES.DISALLOW_ACCESS, disAllowAccessSaga),
        takeLatest(ACTION_TYPES.UPDATE_USER_DETAILS, updateUserDetailsSaga)
    ]);
}
//UPDATE_USER_DETAILS
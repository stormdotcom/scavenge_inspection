import { all, call, fork, put, select, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES, fetchUserList } from "./actions";
import {
    orgListApi, allowAccessApi, disAllowAccessApi, fetchDashboardApi, fetchVesselByIdApi, fetchUserByIdApi,
    fetchVesselListsApi, resetPasswordApi, updateUserDetailsApi, usersListApi, fetchOrgByIdApi
} from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getPagingInfo, getTablePagination } from "./selectors";
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

export function* resetPasswordSaga({ payload }) {
    yield fork(handleAPIRequest, resetPasswordApi, payload);
    const response = yield take([ACTION_TYPES.RESET_PASSWORD_SUCCESS, ACTION_TYPES.RESET_PASSWORD_FAILURE]);
    if (response.type === ACTION_TYPES.RESET_PASSWORD_SUCCESS) {
        yield put(successNotify({ title: "Success", message: "User password updated" }));
    }
}
export function* fetchVesselListsSaga() {
    const tablePagination = yield select(getTablePagination);
    const payload = { ...tablePagination };
    yield call(handleAPIRequest, fetchVesselListsApi, payload);
}

export function* fetchVesselByIdSaga({ payload }) {
    yield call(handleAPIRequest, fetchVesselByIdApi, payload);
}

export function* fetchOrgListSaga() {
    const tablePagination = yield select(getTablePagination);
    const payload = { ...tablePagination };
    yield call(handleAPIRequest, orgListApi, payload);
}
export function* fetchOrgByIdSaga({ payload }) {
    yield call(handleAPIRequest, fetchOrgByIdApi, payload);
}
export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_DASHBOARD_STATS, fetchDashboardSaga),
        takeLatest(ACTION_TYPES.FETCH_USERS_LIST, fetchUsersListSaga),
        takeLatest(ACTION_TYPES.FETCH_USER_BY_ID, fetchUserByIdSaga),
        takeLatest(ACTION_TYPES.ALLOW_ACCESS, allowAccessSaga),
        takeLatest(ACTION_TYPES.DISALLOW_ACCESS, disAllowAccessSaga),
        takeLatest(ACTION_TYPES.RESET_PASSWORD, resetPasswordSaga),
        takeLatest(ACTION_TYPES.FETCH_VESSEL_LIST, fetchVesselListsSaga),
        takeLatest(ACTION_TYPES.FETCH_VESSEL_BY_ID, fetchVesselByIdSaga),
        takeLatest(ACTION_TYPES.FETCH_ORG_TABLE, fetchOrgListSaga),
        takeLatest(ACTION_TYPES.FETCH_ORG_BY_ID, fetchOrgByIdSaga)
    ]);
}

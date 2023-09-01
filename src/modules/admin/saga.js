import { all, call, fork, put, select, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES, fetchUserList } from "./actions";
import {
    orgListApi, allowAccessApi, disAllowAccessApi, fetchDashboardApi, fetchVesselByIdApi, fetchUserByIdApi,
    fetchVesselListsApi, resetPasswordApi, updateUserDetailsApi, usersListApi, fetchOrgByIdApi, updateOrgApi
} from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getExtraProps, getTablePagination } from "./selectors";
import { successNotify } from "../../utils/notificationUtils";
import { actions as sliceActions } from "./slice";

export function* fetchDashboardSaga() {
    yield call(handleAPIRequest, fetchDashboardApi);
}

export function* fetchUsersListSaga() {
    const extraProps = yield select(getExtraProps);
    const tablePagination = yield select(getTablePagination);
    const payload = { ...tablePagination, ...extraProps };
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
    const extraProps = yield select(getExtraProps);
    const payload = { ...tablePagination, ...extraProps };
    yield call(handleAPIRequest, fetchVesselListsApi, payload);
}

export function* fetchVesselByIdSaga({ payload }) {
    yield call(handleAPIRequest, fetchVesselByIdApi, payload);
}

export function* fetchOrgListSaga() {
    const tablePagination = yield select(getTablePagination);
    const extraProps = yield select(getExtraProps);
    const payload = { ...tablePagination, ...extraProps };
    yield call(handleAPIRequest, orgListApi, payload);
}
export function* fetchOrgByIdSaga({ payload }) {
    yield call(handleAPIRequest, fetchOrgByIdApi, payload);
}

export function* searchUserListSaga({ payload }) {
    yield put(sliceActions.setExtraProps(payload));
    yield call(fetchUsersListSaga);
}

export function* searchVesselListSaga({ payload }) {
    yield put(sliceActions.setExtraProps(payload));
    yield call(fetchVesselListsSaga);
}

export function* searchOrgListSaga({ payload }) {
    yield put(sliceActions.setExtraProps(payload));
    yield call(fetchOrgListSaga);
}

export function* updateOrgSaga({ payload }) {
    yield fork(handleAPIRequest, updateOrgApi, payload);
    const response = yield take([ACTION_TYPES.UPDATE_ORG_SUCCESS, ACTION_TYPES.UPDATE_ORG_FAILURE]);
    if (response.type === ACTION_TYPES.UPDATE_ORG_SUCCESS) {
        yield put(successNotify({ title: "Success", message: "Organization Details Updated" }));
    }
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
        takeLatest(ACTION_TYPES.FETCH_ORG_BY_ID, fetchOrgByIdSaga),
        takeLatest(ACTION_TYPES.FILTER_USER_LIST, searchUserListSaga),
        takeLatest(ACTION_TYPES.FILTER_VESSEL_LIST, searchVesselListSaga),
        takeLatest(ACTION_TYPES.FILTER_ORG_LIST, searchOrgListSaga),
        takeLatest(ACTION_TYPES.UPDATE_USER_DETAILS, updateUserDetailsSaga),
        takeLatest(ACTION_TYPES.UPDATE_ORG, updateOrgSaga)
    ]);
}

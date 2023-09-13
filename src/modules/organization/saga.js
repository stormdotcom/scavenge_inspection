import { all, call, fork, put, select, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES, fetchVesselList, fetchVesselRequestList } from "./actions";
import { handleAPIRequest } from "../../utils/http";
import {
    approveVesselApi, createVesselApi, fetchVesselListApi, fetchVesselRequestListApi, fetchManagerProfileApi,
    fetchVesselDetailListsApi, fetchVesselByApi
} from "./api";
import { successNotify } from "../../utils/notificationUtils";
import { actions } from "./slice";
import _ from "lodash";
import { getExtraProps, getTablePagination } from "./selectors";
import { USER_TYPE } from "../common/constants";

export function* fetchVesselListSaga() {
    yield call(handleAPIRequest, fetchVesselListApi);
}
export function* fetchVesselRequestListSaga() {
    yield call(handleAPIRequest, fetchVesselRequestListApi);
}
export function* approveVessel({ payload }) {
    yield fork(handleAPIRequest, approveVesselApi, payload);
    const response = yield take([ACTION_TYPES.APPROVE_VESSEL_SUCCESS, ACTION_TYPES.APPROVE_VESSEL_FAILURE]);
    if (response.type === ACTION_TYPES.APPROVE_VESSEL_SUCCESS) {
        yield put(successNotify({ title: "Success", message: "Vessel Approved Successfully" }));
        yield put(actions.setModalViewDetails(false));
        yield put(fetchVesselRequestList());
    }
}

export function* createVesselSaga({ payload = {} }) {
    const formData = _.cloneDeep(payload);
    _.unset(formData, "confirmPassword");
    yield fork(handleAPIRequest, createVesselApi, formData);
    const response = yield take([ACTION_TYPES.CREATE_VESSEL_SUCCESS, ACTION_TYPES.CREATE_VESSEL_FAILURE]);
    if (response.type === ACTION_TYPES.CREATE_VESSEL_SUCCESS) {
        yield put(successNotify({ title: "Success", message: "Vessel Created Successfully" }));
        yield put(actions.setModal(false));
        yield put(fetchVesselList());
    }
}
export function* fetchVesselDetailListsSaga() {
    const tablePagination = yield select(getTablePagination);
    const extraProps = yield select(getExtraProps);
    const payload = { ...tablePagination, ...extraProps };
    yield call(handleAPIRequest, fetchVesselDetailListsApi, payload);
}
export function* filterVesselListSaga({ payload }) {
    yield put(actions.setExtraProps(payload));
    yield call(fetchVesselDetailListsSaga);
}
export function* fetchVesselById({ payload }) {
    yield call(handleAPIRequest, fetchVesselByApi, payload);
}

export function* fetchManagerProfile() {
    yield call(handleAPIRequest, fetchManagerProfileApi, { userType: USER_TYPE[1] });
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_VESSEL_LIST, fetchVesselListSaga),
        takeLatest(ACTION_TYPES.VESSEL_REQUEST_LIST, fetchVesselRequestListSaga),
        takeLatest(ACTION_TYPES.APPROVE_VESSEL, approveVessel),
        takeLatest(ACTION_TYPES.CREATE_VESSEL, createVesselSaga),
        takeLatest(ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST, fetchVesselDetailListsSaga),
        takeLatest(ACTION_TYPES.FILTER_VESSEL, filterVesselListSaga),
        takeLatest(ACTION_TYPES.FETCH_VESSEL_DETAILS_BY_ID, fetchVesselById),
        takeLatest(ACTION_TYPES.FETCH_MANAGER_PROFILE, fetchManagerProfile)
    ]);
}
//FETCH_MANAGER_PROFILE

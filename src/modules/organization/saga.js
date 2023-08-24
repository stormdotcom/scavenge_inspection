import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES, fetchVesselRequestList } from "./actions";
import { handleAPIRequest } from "../../utils/http";
import { approveVesselApi, fetchVesselListApi, fetchVesselRequestListApi } from "./api";
import { successNotify } from "../../utils/notificationUtils";
import { actions } from "./slice";

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

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_VESSEL_LIST, fetchVesselListSaga),
        takeLatest(ACTION_TYPES.VESSEL_REQUEST_LIST, fetchVesselRequestListSaga),
        takeLatest(ACTION_TYPES.APPROVE_VESSEL, approveVessel)
    ]);
}

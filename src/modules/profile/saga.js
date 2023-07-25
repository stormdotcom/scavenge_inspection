import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { updateVesselInfoApi, fetchVesselInfoApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { successNotify } from "../../utils/notificationUtils";

export function* updateVesselInfo({ payload }) {
    yield call(handleAPIRequest, updateVesselInfoApi, payload);
}

export function* fetchVesselInfo() {
    yield fork(handleAPIRequest, fetchVesselInfoApi);
    const responseAction = yield take([ACTION_TYPES.UPDATE_VESSEL_SUCCESS, ACTION_TYPES.UPDATE_VESSEL_FAILURE]);
    if (responseAction.type === ACTION_TYPES.UPDATE_VESSEL_SUCCESS) {
        yield put(successNotify({ title: "Success", message: "Vessel Details Updated" }));
    }
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.UPDATE_VESSEL, updateVesselInfo),
        takeLatest(ACTION_TYPES.FETCH_VESSEL_DETAILS, fetchVesselInfo)

    ]);
}

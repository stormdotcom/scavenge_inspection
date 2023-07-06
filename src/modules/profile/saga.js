import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { updateVesselInfoApi, fetchVesselInfoApi } from "./api";
import { handleAPIRequest } from "../../utils/http";

export function* updateVesselInfo({ payload }) {
    yield call(handleAPIRequest, updateVesselInfoApi, payload);
}

export function* fetchVesselInfo() {
    yield call(handleAPIRequest, fetchVesselInfoApi);
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.UPDATE_VESSEL, updateVesselInfo),
        takeLatest(ACTION_TYPES.FETCH_VESSEL_DETAILS, fetchVesselInfo)

    ]);
}

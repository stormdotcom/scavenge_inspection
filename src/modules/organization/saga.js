import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { handleAPIRequest } from "../../utils/http";
import { fetchVesselListApi, fetchVesselRequestListApi } from "./api";

export function* fetchVesselListSaga() {
    yield call(handleAPIRequest, fetchVesselListApi);
}
export function* fetchVesselRequestListSaga() {
    yield call(handleAPIRequest, fetchVesselRequestListApi);
}
export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_VESSEL_LIST, fetchVesselListSaga),
        takeLatest(ACTION_TYPES.VESSEL_REQUEST_LIST, fetchVesselRequestListSaga)
    ]);
}

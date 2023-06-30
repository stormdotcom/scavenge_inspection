import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { showPredictionApi, updateInspectionDetailsApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getCurrentCylinder, getImageArray } from "./selectors";
import { errorNotify } from "../../utils/notificationUtils";

export function* updateInspectionDetails({ payload }) {
    yield call(handleAPIRequest, updateInspectionDetailsApi, payload);
}

export function* showPredictionSaga() {
    const cylinder = yield select(getCurrentCylinder);
    const image = yield select(getImageArray);
    if (cylinder === 0 || cylinder === null || cylinder === undefined) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: "Please Select  Cylinder" }));
    }
    if (cylinder && !image[cylinder]) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: `For cylinder number ${cylinder} no image selected` }));
    } if (cylinder && image[cylinder]) {
        let payload = { cylinder, cylinderImage: image[cylinder] };
        yield call(handleAPIRequest, showPredictionApi, payload);
    }

}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SHOW_PREDICTIONS, showPredictionSaga),
        takeLatest(ACTION_TYPES.UPDATE_VESSEL_INSPECTION, updateInspectionDetails)
    ]);
}

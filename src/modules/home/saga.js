import { all, call, fork, put, select, takeLatest, take } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { getInspectionDetailsApi, showPredictionApi, updateInspectionDetailsApi, savePredictedSagaApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getCurrentCylinder, getImageArray, selectInspecDetailData, selectPredictedData } from "./selectors";
import { errorNotify, loaderNotify, successNotify } from "../../utils/notificationUtils";
import { fromMuiDateEpoch } from "../../utils/dateUtils";
import { dismissNotification } from "reapop";
import _ from "lodash";

export function* updateInspectionDetails({ payload }) {
    const newPayload = _.cloneDeep(payload);
    _.set(newPayload, "inspection_date", fromMuiDateEpoch(payload.inspection_date));
    yield call(handleAPIRequest, updateInspectionDetailsApi, newPayload);
}

export function* showPredictionSaga() {
    const cylinder = yield select(getCurrentCylinder);
    const image = yield select(getImageArray);
    const inspectionDetails = yield select(selectInspecDetailData);
    if (cylinder === 0 || cylinder === null || cylinder === undefined) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: "Please Select  Cylinder" }));
    }
    if (cylinder && !image[cylinder]) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: `For cylinder number ${cylinder} no image selected` }));
    } if (cylinder && image[cylinder]) {
        let payload = { cylinder, image: image[cylinder], ...inspectionDetails };
        yield fork(handleAPIRequest, showPredictionApi, payload);
        const response = yield take([ACTION_TYPES.SHOW_PREDICTIONS_REQUEST, ACTION_TYPES.SHOW_PREDICTIONS_SUCCESS, ACTION_TYPES.SHOW_PREDICTIONS_FAILURE]);
        if (response.type === ACTION_TYPES.SHOW_PREDICTIONS_REQUEST) {
            yield put(loaderNotify({ id: "prediction_image_upload", title: "Uploading File", message: "Image Uploading" }));
        }
        if (response.type === ACTION_TYPES.SHOW_PREDICTIONS_SUCCESS) {
            yield put(dismissNotification("prediction_image_upload"));
        }
    }

}

export function* getInspectionDetailsSaga() {
    yield call(handleAPIRequest, getInspectionDetailsApi);
}
export function* savePredictedSaga() {
    const data = yield select(selectPredictedData);
    yield fork(handleAPIRequest, savePredictedSagaApi, data);
    const response = yield take([ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST, ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS, ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE]);
    if (response.type === ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST) {
        yield put(loaderNotify({ id: "prediction_data", title: "Saving", message: "Predicted Data" }));
    }
    if (response.type === ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS) {
        yield put(dismissNotification("prediction_data"));
        yield put(successNotify({ title: "Success", message: "Predicted Data Saved" }));
    }
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SHOW_PREDICTIONS, showPredictionSaga),
        takeLatest(ACTION_TYPES.UPDATE_VESSEL_INSPECTION, updateInspectionDetails),
        takeLatest(ACTION_TYPES.GET_VESSEL_INSPECTION, getInspectionDetailsSaga),
        takeLatest(ACTION_TYPES.SAVE_PREDICTED, savePredictedSaga)
    ]);
}

import { all, call, fork, put, select, takeLatest, take, delay } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { getReportListApi, getInspectionDetailsApi, showPredictionApi, updateInspectionDetailsApi, savePredictedSagaApi, getReportByIdApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getCurrentCylinder, getExtraProps, getImageArray, getPagination, selectInspecDetailData, selectInspectionDetails, selectPredictedData } from "./selectors";
import { errorNotify, loaderNotify, successNotify } from "../../utils/notificationUtils";
import { fromMuiDateEpoch } from "../../utils/dateUtils";
import { dismissNotification } from "reapop";
import _ from "lodash";
import { getUserData } from "../common/selectors";
import { formatProps } from "../../utils/sagaUtils";
import { actions as sliceActions } from "./slice";

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
    const predictionInfo = yield select(selectPredictedData);
    const inspectionFormData = yield select(selectInspectionDetails);
    const inspectionDetails = _.cloneDeep(inspectionFormData.data);
    const userData = yield select(getUserData);
    const organization = _.get(userData, "organizationBelongsTo._id", "");

    let payload = { predictionInfo: predictionInfo, ...inspectionDetails, organization };
    yield fork(handleAPIRequest, savePredictedSagaApi, payload);
    const responseReq = yield take([ACTION_TYPES.SAVE_PREDICTED_REQUEST]);
    if (responseReq.type === ACTION_TYPES.SAVE_PREDICTED_REQUEST) {
        yield put(loaderNotify({ id: "prediction_data", title: "Saving", message: "Predicted Data" }));
    }
    const response = yield take([ACTION_TYPES.SAVE_PREDICTED_SUCCESS]);

    if (response.type === ACTION_TYPES.SAVE_PREDICTED_SUCCESS) {
        yield put(dismissNotification("prediction_data"));
        yield delay(200);
        yield put(successNotify({ title: "Success", message: "Predicted Data Saved" }));
    }

}

export function* getReportListSaga() {
    const tablePagination = yield select(getPagination);
    const extraProps = yield select(getExtraProps);
    const props = formatProps(extraProps);
    const payload = { ...tablePagination, ...props };
    yield call(handleAPIRequest, getReportListApi, payload);
}

export function* searchReportSaga({ payload }) {
    yield put(sliceActions.setExtraProps(payload));
    yield call(getReportListSaga);
}

export function* reportByIdSaga({ payload }) {
    yield call(handleAPIRequest, getReportByIdApi, payload);
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SHOW_PREDICTIONS, showPredictionSaga),
        takeLatest(ACTION_TYPES.UPDATE_VESSEL_INSPECTION, updateInspectionDetails),
        takeLatest(ACTION_TYPES.GET_VESSEL_INSPECTION, getInspectionDetailsSaga),
        takeLatest(ACTION_TYPES.SAVE_PREDICTED, savePredictedSaga),
        takeLatest(ACTION_TYPES.REPORT_LIST, getReportListSaga),
        takeLatest(ACTION_TYPES.SEARCH_REPORT, searchReportSaga),
        takeLatest(ACTION_TYPES.REPORT_BY_ID, reportByIdSaga)
    ]);
}

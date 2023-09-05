import { all, call, fork, put, select, takeLatest, take, delay } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { getReportListApi, getInspectionDetailsApi, showPredictionApi, updateInspectionDetailsApi, savePredictedSagaApi, getReportByIdApi, exportPdfApi, exportExcelApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getCurrentCylinder, getExtraProps, getImageArray, getPagination, selectInspecDetailData, selectInspectionDetails, selectPredictedData } from "./selectors";
import { errorNotify, loaderNotify, successNotify } from "../../utils/notificationUtils";
import { fromMuiDateEpoch } from "../../utils/dateUtils";
import { dismissNotification } from "reapop";
import _ from "lodash";
import { getUserData } from "../common/selectors";
import { formatProps } from "../../utils/sagaUtils";
import { actions as sliceActions } from "./slice";
import { handleFileAPIRequest } from "../../utils/handleFile";
import { formatUser } from "./constants";

export function* updateInspectionDetails({ payload }) {
    const newPayload = _.cloneDeep(payload);
    _.set(newPayload, "inspection_date", fromMuiDateEpoch(payload.inspection_date));
    yield call(handleAPIRequest, updateInspectionDetailsApi, newPayload);
}

export function* showPredictionSaga() {
    const cylinder = yield select(getCurrentCylinder);
    const image = yield select(getImageArray);
    const inspectionDetails = yield select(selectInspecDetailData);
    if (inspectionDetails.cylinder_numbers < 1) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: "Cylinder Number Required" }));
    }
    if (!cylinder) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: "Please Select  Cylinder" }));
    }
    if (cylinder && !image) {
        yield put(errorNotify({ title: "INPUT_ERROR", message: `For cylinder number ${cylinder} no image selected` }));
    } if (cylinder && image && inspectionDetails.cylinder_numbers > 0) {
        let payload = { cylinder, image, ...inspectionDetails };
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
    const predictionData = yield select(selectPredictedData);
    const inspectionFormData = yield select(selectInspectionDetails);
    const inspectionDetails = _.cloneDeep(inspectionFormData.data);
    const userData = yield select(getUserData);
    const organization = _.get(userData, "organizationBelongsTo._id", "");

    let payload = { cylindersReport: predictionData, ...inspectionDetails, organization };
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

export function* exportPdfSaga() {
    let user = yield select(getUserData);
    let inspectionDetails = yield select(selectInspectionDetails);

    let info = _.get(inspectionDetails, "data");
    const predictionInfoForm = yield select(selectPredictedData);

    const predictionInfo = _.get(predictionInfoForm, "data");

    yield call(handleFileAPIRequest, exportPdfApi, { user: formatUser(user), predictionInfo, info });
}

export function* exportExcelSaga() {
    let user = yield select(getUserData);
    let inspectionDetails = yield select(selectInspectionDetails);
    let info = _.get(inspectionDetails, "data");
    const predictionInfoForm = yield select(selectPredictedData);

    const predictionInfo = _.get(predictionInfoForm, "data");

    yield call(handleFileAPIRequest, exportExcelApi, { user: formatUser(user), predictionInfo, info });
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SHOW_PREDICTIONS, showPredictionSaga), //FETCH_VESSEL_LIST
        takeLatest(ACTION_TYPES.UPDATE_VESSEL_INSPECTION, updateInspectionDetails),
        takeLatest(ACTION_TYPES.GET_VESSEL_INSPECTION, getInspectionDetailsSaga),
        takeLatest(ACTION_TYPES.SAVE_PREDICTED, savePredictedSaga),
        takeLatest(ACTION_TYPES.REPORT_LIST, getReportListSaga),
        takeLatest(ACTION_TYPES.SEARCH_REPORT, searchReportSaga),
        takeLatest(ACTION_TYPES.REPORT_BY_ID, reportByIdSaga),
        takeLatest(ACTION_TYPES.EXPORT_DOCUMENT_PDF, exportPdfSaga),
        takeLatest(ACTION_TYPES.EXPORT_DOCUMENT_EXCEL, exportExcelSaga)
    ]);
}

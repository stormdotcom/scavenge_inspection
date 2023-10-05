import { all, call, fork, put, select, takeLatest, take, delay } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { getReportListApi, getInspectionDetailsApi, showPredictionApi, updateInspectionDetailsApi, savePredictedSagaApi, getReportByIdApi } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { getCurrentCylinder, getExtraProps, getImageArray, getPagination, selectInspecDetailData, selectInspectionDetails, selectPredictedData } from "./selectors";
import { errorNotify, loaderNotify, successNotify } from "../../utils/notificationUtils";
import { fromEpochToMuiDate, fromMuiDateEpoch } from "../../utils/dateUtils";
import { dismissNotification } from "reapop";
import _ from "lodash";
import { getUserData } from "../common/selectors";
import { formatProps } from "../../utils/sagaUtils";
import { actions as sliceActions } from "./slice";
import { DEFECT_DETECTION, formatPredictedData, formatUser } from "./constants";

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
        yield put(sliceActions.clearPredictedDate());
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
    const user = yield select(getUserData);
    const inspectionDetails = yield select(selectInspectionDetails);
    const cloneInspectionDetails = _.cloneDeep(inspectionDetails);
    const rawInspectionDetails = _.get(cloneInspectionDetails, "data");
    const rawFormData = yield select(selectPredictedData);
    const { inspection_date, total_running_hours } = rawInspectionDetails;
    const { predictionInfo } = formatPredictedData(rawFormData, inspection_date, total_running_hours);
    const { company_name } = user.organizationBelongsTo;
    const modifiedInspectionDetails = _.omit(rawInspectionDetails, ["normal_service_load_in_percent_MCRMCR", "inspection_date"]);
    const { vessel_name, imo_number, manufacturer, type_of_engine, vessel_type } = user.vesselDetails;
    const info = { ...modifiedInspectionDetails, inspection_date: fromEpochToMuiDate(inspection_date), company_name, vessel_name, imo_number, manufacturer, type_of_engine, vessel_type };
    const input = { user: formatUser(user), info, predictionInfo };
    try {
        yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_REQUEST });
        yield put(loaderNotify({ title: "Downloading", message: "Inspection Report.pdf", id: "Inspection_Report.pdf" }));
        const res = yield call(fetch, DEFECT_DETECTION.EXPORT_PDF, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        });

        if (res.ok) {
            yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_PDF_SUCCESS });
            const dataDownload = yield call([res, res.blob]);
            const url = window.URL.createObjectURL(new Blob([dataDownload], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Inspection_Report.pdf");
            document.body.appendChild(link);
            link.click();
            yield put(dismissNotification("Inspection_Report.pdf"));
            yield put(successNotify({ title: "Successfully Downloaded", message: "Inspection_Report.pdf" }));
        } else {
            yield put(errorNotify({ title: "Failed", message: "Failed to download PDF", id: "Inspection Report.pdf" }));
            yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_FAILURE, error: "Failed to download PDF." });
        }
    } catch (error) {
        yield put(errorNotify({ title: "Error", message: "Failed to download  pdf", id: "Inspection Report.pdf" }));
        yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_FAILURE, error: "An error occurred while downloading PDF" });
    }
}

export function* exportExcelSaga() {
    const user = yield select(getUserData);
    const inspectionDetails = yield select(selectInspectionDetails);
    const cloneInspectionDetails = _.cloneDeep(inspectionDetails);
    const rawInspectionDetails = _.get(cloneInspectionDetails, "data");
    const rawFormData = yield select(selectPredictedData);
    const { inspection_date, total_running_hours } = rawInspectionDetails;
    const { predictionInfo } = formatPredictedData(rawFormData, inspection_date, total_running_hours);
    const { company_name } = user.organizationBelongsTo;
    const modifiedInspectionDetails = _.omit(rawInspectionDetails, ["normal_service_load_in_percent_MCRMCR", "inspection_date"]);
    const { vessel_name, imo_number, manufacturer, type_of_engine, vessel_type } = user.vesselDetails;
    const info = { ...modifiedInspectionDetails, inspection_date: fromEpochToMuiDate(inspection_date), company_name, vessel_name, imo_number, manufacturer, type_of_engine, vessel_type };
    const input = { user: formatUser(user), info, predictionInfo };
    try {
        yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_REQUEST });
        yield put(loaderNotify({ title: "Downloading", message: "Inspection Report.xslx", id: "Inspection_Report.xslx" }));
        const res = yield call(fetch, DEFECT_DETECTION.EXPORT_EXCEL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        });

        if (res.ok) {
            yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_SUCCESS });
            const dataDownload = yield call([res, res.blob]);
            const url = window.URL.createObjectURL(new Blob([dataDownload], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Inspection_Report.xlsx");
            document.body.appendChild(link);
            link.click();
            yield put(dismissNotification("Inspection_Report.xslx"));
            yield put(successNotify({ title: "Successfully Downloaded", message: "Inspection_Report.xslx" }));
        } else {
            yield put(errorNotify({ title: "Failed", message: "Failed to download  Excel", id: "Inspection Report.xslx" }));
            yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_FAILURE, error: "Failed to download Excel." });
        }
    } catch (error) {
        yield put(errorNotify({ title: "Failed", message: "Failed to download  Excel", id: "Inspection Report.xslx" }));
        yield put({ type: ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_FAILURE, error: "An error occurred while downloading Excel" });
    }
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SHOW_PREDICTIONS, showPredictionSaga),
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

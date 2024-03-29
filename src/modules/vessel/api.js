import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./urls";

export const showPredictionApi = (data) => {
    return {
        url: API_URL.VESSEL.SHOW_PREDICTION,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.SHOW_PREDICTIONS_REQUEST, ACTION_TYPES.SHOW_PREDICTIONS_SUCCESS, ACTION_TYPES.SHOW_PREDICTIONS_FAILURE],
            data
        }

    };
};

export const updateInspectionDetailsApi = (data) => {
    return {
        url: API_URL.VESSEL.UPDATE_INSPECTION_DETAILS,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.UPDATE_VESSEL_INSPECTION_REQUEST, ACTION_TYPES.UPDATE_VESSEL_INSPECTION_SUCCESS, ACTION_TYPES.UPDATE_VESSEL_INSPECTION_FAILURE],
            data
        }

    };
};

export const getInspectionDetailsApi = () => {
    return {
        url: API_URL.VESSEL.GET_INSPECTION_DETAILS,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST, ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS, ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE]
        }

    };
};


export const savePredictedSagaApi = (data) => {
    return {
        url: API_URL.VESSEL.SAVE_PREDICTED,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SAVE_PREDICTED_REQUEST, ACTION_TYPES.SAVE_PREDICTED_SUCCESS, ACTION_TYPES.SAVE_PREDICTED_FAILURE],
            data
        }

    };
};

export const getReportListApi = (data) => {
    return {
        url: API_URL.REPORT.LIST_REPORTS,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.REPORT_LIST_REQUEST, ACTION_TYPES.REPORT_LIST_SUCCESS, ACTION_TYPES.REPORT_LIST_FAILURE],
            data
        }

    };
};

export const getReportByIdApi = (id) => {
    return {
        url: API_URL.REPORT.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.REPORT_BY_ID_REQUEST, ACTION_TYPES.REPORT_BY_ID_SUCCESS, ACTION_TYPES.REPORT_BY_ID_FAILURE]
        }

    };
};

export const exportPdfApi = (data) => {
    return {
        url: API_URL.INSPECTION.PDF,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.EXPORT_DOCUMENT_PDF_REQUEST, ACTION_TYPES.EXPORT_DOCUMENT_PDF_SUCCESS, ACTION_TYPES.EXPORT_DOCUMENT_PDF_FAILURE],
            data
        },
        fileName: "Inspection Report",
        ext: "pdf"

    };
};
export const exportExcelApi = (data) => {
    return {
        url: API_URL.INSPECTION.EXCEL,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_REQUEST, ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_SUCCESS, ACTION_TYPES.EXPORT_DOCUMENT_EXCEL_FAILURE],
            data
        },
        fileName: "Inspection Report",
        ext: "xlsx"
    };
};

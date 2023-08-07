import { documentType } from "./constants";

export const API_URL = {
    VESSEL: {
        SHOW_PREDICTION: "auth/vessel/show-prediction",
        GET_VESSEL_DETAIL: "signup",
        GET_INSPECTION_DETAILS: "auth/vessel/inspection-details",
        UPDATE_INSPECTION_DETAILS: "auth/vessel/inspection-details",
        SAVE_PREDICTED: "auth/vessel/predicted/save"
    },
    REPORT: {
        LIST_REPORTS: "auth/vessel/reports",
        BY_ID: "auth/vessel/reports/:id"
    },
    EXPORT: {
        SAVE_PDF: `auth/vessel/predicted/export?documentType=${documentType.pdf}`,
        SAVE_EXCEL: `auth/vessel/predicted/export?documentType=${documentType.xls}`
    }
};

/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import { fromDateObjectToEpoch, fromEpochToMuiDate } from "../../utils/dateUtils";
import { COMMON_TABLE_PAGINATION } from "../common/constants";

let now = new Date();
const initialState = {
    currentCylinder: 1,
    image: [],
    tempVesselData: {},
    openImageUploader: false,
    isPredicted: false,
    predictedData: {
        requestInProgress: false,
        data: {}
    },
    viewToggle: false,
    inspectionDetails: {
        requestInProgress: false,
        data: {
            inspection_date: "",
            normal_service_load_in_percent_MCRMCR: "",
            total_running_hours: "",
            running_hrs_since_last: "",
            cyl_oil_Type: "",
            cyl_oil_consump_Ltr_24hr: "",
            normal_service_load_in_percent_MCR: "",
            cylinder_numbers: ""
        }
    },
    reports: {
        requestInProgress: false,
        table: {
            data: [],
            pagingInfo: {
                ...COMMON_TABLE_PAGINATION
            },
            rowSelection: {},
            rowSelectionState: {},
            extraProps: {
                startDate: 1680000000, //1680887898 1690887698 1680000000
                endDate: fromDateObjectToEpoch(now)
            }
        }
    },
    reportDetails: {
        requestInProgress: false,
        data: {
            inspection_date: 0,
            normal_service_load_in_percent_MCRMCR: "",
            total_running_hours: "",
            running_hrs_since_last: "",
            cyl_oil_Type: "",
            cyl_oil_consump_Ltr_24hr: "",
            normal_service_load_in_percent_MCR: "",
            cylinder_numbers: "",
            cylindersReport: {}
        }
    }
};

const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState,
        clear: (state) => {
            state.table = initialState.table;
        },
        setInspectionDetails: (state, { payload: formData = {} }) => {
            const payload = _.cloneDeep(formData);
            _.set(state, "tempVesselData", payload);
        },
        clearForm: (state) => {
            state.inspectionDetails = initialState.inspectionDetails;
        },
        setImageUploader: (state, { payload }) => {
            state.openImageUploader = payload;
        },
        setImage: (state, { payload }) => {
            const { image } = payload;
            state.image = image;
            state.viewToggle = true;
        },
        setCylinderNumbers: (state, { payload }) => {
            state.currentCylinder = payload;
            state.viewToggle = false;
        },
        setPagination: (state, { payload }) => {
            state.reports.table.pagingInfo = payload;
        },
        setExtraProps: (state, { payload }) => {
            state.reports.table.extraProps = payload;
        },
        clearPredictedDate: (state) => {
            state.predictedData.data = {};
            state.isPredicted = false;
        },
        setRemarks: (state, { payload: { key, value } = {} }) => {
            _.set(state, `predictedData.data.${key}.remarks`, value);
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST, (state) => {
                _.set(state, "inspectionDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "inspectionDetails.requestInProgress", false);
                _.set(state, "inspectionDetails.data", payload.data);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE, (state) => {
                _.set(state, "inspectionDetails.requestInProgress", false);
            })

            .addCase(ACTION_TYPES.SHOW_PREDICTIONS_REQUEST, (state) => {
                _.set(state, "openImageUploader", false);
                // _.set(state, "inspectionDetails.requestInProgress", true);
                _.set(state, "predictedData.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.SHOW_PREDICTIONS_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "isPredicted", true);
                // _.set(state, "inspectionDetails.requestInProgress", false);
                _.set(state, "predictedData.requestInProgress", false);
                _.set(state, "inspectionDetails.data", payload.data.updatedResult); // payload.data.updatedResult
                let { cylinder, results } = payload.data.predictionDetails;
                _.set(state, `predictedData.data.${cylinder}`, results);
                _.set(state, `predictedData.data.${cylinder}.remarks`, "");
            })
            .addCase(ACTION_TYPES.SHOW_PREDICTIONS_FAILURE, (state) => {
                _.set(state, "predictedData.requestInProgress", false);
                // _.set(state, "inspectionDetails.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.REPORT_LIST_REQUEST, (state) => {
                _.set(state, "reports.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.REPORT_LIST_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "reports.requestInProgress", false);
                _.set(state, "reports.table.data", payload.data);
                _.set(state, "reports.table.pagingInfo", payload.pagingInfo);
            })
            .addCase(ACTION_TYPES.REPORT_LIST_FAILURE, (state) => {
                _.set(state, "reports.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.REPORT_BY_ID_REQUEST, (state) => {
                _.set(state, "reportDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.REPORT_BY_ID_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "reportDetails.requestInProgress", false);
                const { inspection_date = "" } = payload.data;
                const formattedDate = fromEpochToMuiDate(inspection_date);
                _.set(state, "reportDetails.data", payload.data);
                _.set(state, "reportDetails.data.inspection_date", formattedDate);
            })
            .addCase(ACTION_TYPES.REPORT_BY_ID_FAILURE, (state) => {
                _.set(state, "reportDetails.requestInProgress", false);
            });
    }
});

export const { actions, reducer } = slice;

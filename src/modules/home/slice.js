/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import { fromDateObjectToMuiDate, fromEpochToMuiDate, fromMuiDateEpoch } from "../../utils/dateUtils";
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
        data: {
            brk: {},
            dep: {},
            image: "",
            lub: {},
            surf: {},
            cylinder: "--"
        }
    },
    viewToggle: false,
    inspectionDetails: {
        requestInProgress: false,
        data: {
            inspection_date: fromDateObjectToMuiDate(now), // new Date(), //
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
            paginationInfo: {
                ...COMMON_TABLE_PAGINATION
            },
            rowSelection: {},
            rowSelectionState: {}
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
            let inspection_date = fromMuiDateEpoch(payload.inspection_date);
            state.tempVesselData = payload;
            _.set(state, "tempVesselData", payload);
            _.set(state, "tempVesselData.inspection_date", inspection_date);
        },
        clearForm: (state) => {
            state.inspectionDetails = initialState.inspectionDetails;
        },
        setImageUploader: (state, { payload }) => {
            state.openImageUploader = payload;
        },
        setImage: (state, { payload }) => {
            const { cylinder, image } = payload;
            state.image[cylinder] = image;
            state.viewToggle = true;
        },
        setCylinderNumbers: (state, { payload }) => {
            state.currentCylinder = payload;
            state.viewToggle = false;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST, (state) => {
                _.set(state, "inspectionDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "inspectionDetails.requestInProgress", false);
                let resultDate = fromEpochToMuiDate(payload.data.inspection_date);
                let initialInspectionDate = initialState.inspectionDetails.data.inspection_date;
                let newPayload = { ...payload.data, inspection_date: resultDate ? resultDate : initialInspectionDate };
                _.set(state, "inspectionDetails.data", newPayload);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE, (state) => {
                _.set(state, "inspectionDetails.requestInProgress", false);
            })

            .addCase(ACTION_TYPES.SHOW_PREDICTIONS_REQUEST, (state) => {
                _.set(state, "openImageUploader", false);
                _.set(state, "inspectionDetails.requestInProgress", true);
                _.set(state, "predictedData.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.SHOW_PREDICTIONS_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "isPredicted", true);
                _.set(state, "inspectionDetails.requestInProgress", false);
                _.set(state, "predictedData.requestInProgress", false);
                _.set(state, "inspectionDetails.data", payload.data.updatedResult); // payload.data.updatedResult
                let resultDate = fromEpochToMuiDate(payload.data.updatedResult.inspection_date);
                let initialInspectionDate = initialState.inspectionDetails.data.inspection_date;
                let newPayload = { ...payload.data.updatedResult, inspection_date: resultDate ? resultDate : initialInspectionDate };
                _.set(state, "inspectionDetails.data", newPayload);
                _.set(state, "predictedData.data", payload.data.predictionDetails);
            })
            .addCase(ACTION_TYPES.SHOW_PREDICTIONS_FAILURE, (state) => {
                _.set(state, "predictedData.requestInProgress", false);
                _.set(state, "inspectionDetails.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.REPORT_LIST_REQUEST, (state) => {
                _.set(state, "reports.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.REPORT_LIST_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "reports.requestInProgress", false);
                _.set(state, "reports.table", payload);
            })
            .addCase(ACTION_TYPES.REPORT_LIST_FAILURE, (state) => {
                _.set(state, "reports.requestInProgress", false);
            });

    }
});
//REPORT_LIST_DETAILS_REQUEST
export const { actions, reducer } = slice;

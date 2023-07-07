/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import { fromDateObjectToMuiDate, fromEpochToMuiDate } from "../../utils/dateUtils";

const initialState = {
    currentCylinder: 0,
    image: [],
    openImageUploader: false,
    viewToggle: false,
    inspectionDetails: {
        requestInProgress: false,
        data: {
            inspection_date: fromDateObjectToMuiDate(new Date()),
            normal_service_load_in_percent_MCRMCR: "",
            total_running_hours: "",
            running_hrs_since_last: "",
            cyl_oil_Type: "",
            cyl_oil_consump_Ltr_24hr: "",
            normal_service_load_in_percent_MCR: "",
            cylinder_numbers: ""
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
        clearForm: (state) => {
            state.inspectionDetails.data = initialState.inspectionDetails.data;
        },
        setImageUploader: (state, { payload }) => {
            state.openImageUploader = payload;
        },
        setImage: (state, { payload }) => {
            const { cylinder, image } = payload;
            state.image[cylinder] = image;
            state.viewToggle = true;
        },
        setcylinder_numbers: (state, { payload }) => {
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
                let newPayload = { ...payload.data, inspection_date: fromEpochToMuiDate(payload.data.inspection_date) };
                _.set(state, "inspectionDetails.data", newPayload);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE, (state) => {
                _.set(state, "inspectionDetails.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

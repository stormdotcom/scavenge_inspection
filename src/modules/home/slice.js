/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";

const initialState = {
    currentCylinder: 0,
    image: [],
    openImageUploader: false,
    viewToggle: false,
    vesselDetails: {
        requestInProgress: false,
        data: {
            inspectionDate: "",
            serviceLoadMCR: "",
            totalRunningHours: "",
            lastRunningHours: "",
            cylinderOilType: "",
            cylinderOilConsump: "",
            serviceLoad: "",
            cylinderNumber: ""
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
            state.vesselDetails.data = initialState.vesselDetails.data;
        },
        setImageUploader: (state, { payload }) => {
            state.openImageUploader = payload;
        },
        setImage: (state, { payload }) => {
            const { cylinder, image } = payload;
            state.image[cylinder] = image;
            state.viewToggle = true;
        },
        setCylinderNumber: (state, { payload }) => {
            state.currentCylinder = payload;
            state.viewToggle = false;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_REQUEST, (state) => {
                _.set(state, "vesselDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "vesselDetails.requestInProgress", false);
                _.set(state, "vesselDetails.data", payload.data);
            })
            .addCase(ACTION_TYPES.GET_VESSEL_INSPECTION_FAILURE, (state) => {
                _.set(state, "vesselDetails.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

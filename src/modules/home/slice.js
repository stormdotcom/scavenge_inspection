/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

import { STATE_REDUCER_KEY } from "./constants";
const initialState = {
    currentCylinder: 0,
    image: [],
    openImageUploader: false,
    viewToggle: false,
    vesselDetails: {
        requestInProgress: false,
        data: {
            inspectionDate: 12222,
            serviceLoadMCR: "A",
            totalRunningHours: "B",
            lastRunningHours: "C",
            cylinderOilType: "D",
            cylinderOilConsump: "E",
            serviceLoad: "2",
            cylinderNumber: 2
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
    extraReducers: () => {
        // builder
        //     .addCase(ACTION_TYPES.FETCH_USER_BY_ID_REQUEST, (state) => {
        //         _.set(state, "userDetails.requestInProgress", true);
        //     })
        //     .addCase(ACTION_TYPES.FETCH_USER_BY_ID_SUCCESS, (state, action) => {
        //         _.set(state, "userDetails.requestInProgress", false);
        //         _.set(state, "userDetails.data", action.payload);
        //     })
        //     .addCase(ACTION_TYPES.FETCH_USER_BY_ID_FAILURE, (state) => {
        //         _.set(state, "userDetails.requestInProgress", false);
        //     });

    }
});

export const { actions, reducer } = slice;

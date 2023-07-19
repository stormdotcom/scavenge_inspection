/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import _ from "lodash";
const initialState = {
    vesselDetails: {
        requestInProgress: false,
        data: {
            vessel_name: "",
            imo_number: "",
            manufacturer: "",
            type_of_engine: "",
            vessel_type: "",
            cylinder_numbers: 0
        }
    }

};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_REQUEST, (state) => {
                _.set(state, "vesselDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "vesselDetails.requestInProgress", false);
                _.set(state, "vesselDetails.data", payload.data);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_FAILURE, (state) => {
                _.set(state, "vesselDetails.requestInProgress", false);
            })
            //
            .addCase(ACTION_TYPES.UPDATE_VESSEL_REQUEST, (state) => {
                _.set(state, "vesselDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.UPDATE_VESSEL_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "vesselDetails.requestInProgress", false);
                _.set(state, "vesselDetails.data", payload.data);
            })
            .addCase(ACTION_TYPES.UPDATE_VESSEL_FAILURE, (state) => {
                _.set(state, "vesselDetails.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

import { STATE_REDUCER_KEY } from "./constants";
const initialState = {

    vesselDetails: {
        requestInProgress: false,
        data: {
            vesselName: "",
            imoNumber: "",
            manufacturer: "",
            engineType: "",
            vesselType: ""
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

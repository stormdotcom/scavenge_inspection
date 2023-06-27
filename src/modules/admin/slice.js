import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { ACTION_TYPES } from "./actions";
import { STATE_REDUCER_KEY } from "./constants";
const initialState = {

    userDetails: {
        requestInProgress: false,
        data: {
            name: "",
            description: "",
            eamil: ""

        }
    },
    usersList: {
        requestInProgress: false,
        data: []
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
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.FETCH_USER_BY_ID_REQUEST, (state) => {
                _.set(state, "userDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_USER_BY_ID_SUCCESS, (state, action) => {
                _.set(state, "userDetails.requestInProgress", false);
                _.set(state, "userDetails.data", action.payload);
            })
            .addCase(ACTION_TYPES.FETCH_USER_BY_ID_FAILURE, (state) => {
                _.set(state, "userDetails.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

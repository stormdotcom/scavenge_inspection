import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { ACTION_TYPES } from "./actions";
import { STATE_REDUCER_KEY } from "./constants";
import { COMMON_TABLE_PAGINATION } from "../common/constants";
const initialState = {

    dashboardCards: {
        requestInProgress: false,
        data: {
            organizations: 0,
            usersCount: 0,
            fleetManagers: 0,
            vesselsCount: 0, reportsCount: 0, imagesUploadedCount: 0
        }
    },
    usersList: {
        requestInProgress: false,
        data: [],
        table: {
            data: [],
            pagingInfo: {
                ...COMMON_TABLE_PAGINATION
            },
            rowSelection: {},
            rowSelectionState: {},
        }
    },
    userDetails: {
        requestInProgress: false,
        data: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
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
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.FETCH_DASHBOARD_STATS_REQUEST, (state) => {
                _.set(state, "dashboardCards.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_DASHBOARD_STATS_SUCCESS, (state, action) => {
                _.set(state, "dashboardCards.requestInProgress", false);
                _.set(state, "dashboardCards.data", action.payload);
            })
            .addCase(ACTION_TYPES.FETCH_DASHBOARD_STATS_FAILURE, (state) => {
                _.set(state, "dashboardCards.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

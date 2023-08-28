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
            totalUsers: 0,
            fleetManagers: 0,
            vessels: 0, reports: 0, cylinderImageCount: 0
        }
    },
    usersList: {
        requestInProgress: false,
        table: {
            data: [],
            pageInfo: {
                ...COMMON_TABLE_PAGINATION
            },
            rowSelection: {},
            rowSelectionState: {}
        }
    },
    userDetails: {
        requestInProgress: false,
        data: {
            _id: "",
            fullName: "",
            email: "",
            phone: ""
        }
    },
    passwordDetails: {
        requestInProgress: false
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
        setPagination: (state, { payload }) => {
            state.usersList.table.pageInfo = payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.FETCH_DASHBOARD_STATS_REQUEST, (state) => {
                _.set(state, "dashboardCards.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_DASHBOARD_STATS_SUCCESS, (state, action) => {
                _.set(state, "dashboardCards.requestInProgress", false);
                _.set(state, "dashboardCards.data", action.payload.data);
            })
            .addCase(ACTION_TYPES.FETCH_DASHBOARD_STATS_FAILURE, (state) => {
                _.set(state, "dashboardCards.requestInProgress", false);
            })

            .addCase(ACTION_TYPES.FETCH_USERS_LIST_REQUEST, (state) => {
                _.set(state, "usersList.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_USERS_LIST_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "usersList.requestInProgress", false);
                _.set(state, "usersList.table.data", payload.data);
                _.set(state, "usersList.table.pageInfo", payload.pageInfo);
            })
            .addCase(ACTION_TYPES.FETCH_USERS_LIST_FAILURE, (state) => {
                _.set(state, "usersList.requestInProgress", false);
            })

            .addCase(ACTION_TYPES.FETCH_USER_BY_ID_REQUEST, (state) => {
                _.set(state, "userDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_USER_BY_ID_SUCCESS, (state, { payload }) => {
                _.set(state, "userDetails.requestInProgress", false);
                _.set(state, "userDetails.data", payload.data);
            })
            .addCase(ACTION_TYPES.FETCH_USER_BY_ID_FAILURE, (state) => {
                _.set(state, "userDetails.requestInProgress", false);
            })

            .addCase(ACTION_TYPES.UPDATE_USER_DETAILS_REQUEST, (state) => {
                _.set(state, "userDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.UPDATE_USER_DETAILS_SUCCESS, (state, { payload }) => {
                _.set(state, "userDetails.requestInProgress", false);
                _.set(state, "userDetails.data", payload.data);
            })
            .addCase(ACTION_TYPES.UPDATE_USER_DETAILS_FAILURE, (state) => {
                _.set(state, "userDetails.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

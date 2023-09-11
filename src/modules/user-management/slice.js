/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import _ from "lodash";
const initialState = {
    isLoggedIn: false,
    orgAdmin: [],
    orgList: [],
    signIn: {
        requestInProgress: false,
        data: {
            email: "",
            password: ""
        }
    },
    signUp: {
        confirm: false,
        requestInProgress: false,
        data: {
            fullName: "",
            newOrg: false,
            email: "",
            password: "",
            confirmPassword: "",
            userType: "",
            company_name: "",
            vessel_name: ""
        }
    },
    signUpManager: {
        requestInProgress: false,
        data: {
            fullName: "",
            isNewOrg: "existingOrg",
            email: "",
            password: "",
            confirmPassword: "",
            company_name: ""
        }
    },
    signUpVessel: {
        requestInProgress: false,
        data: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            company_name: "",
            vessel_name: "",
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
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.FETCH_ORG_ADMINS_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "orgAdmin", payload.data);
            })
            .addCase(ACTION_TYPES.FETCH_ADMIN_BY_ORG_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "orgAdmin", payload.data);
            })
            .addCase(ACTION_TYPES.SIGN_IN_REQUEST, (state) => {
                _.set(state, "signIn.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.SIGN_IN_SUCCESS, (state) => {
                _.set(state, "signIn.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.SIGN_IN_FAILURE, (state) => {
                _.set(state, "signIn.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.SIGN_UP_REQUEST, (state) => {
                _.set(state, "signUp.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.SIGN_UP_SUCCESS, (state) => {
                _.set(state, "signUp.confirm", true);
                _.set(state, "signUp.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.SIGN_UP_FAILURE, (state) => {
                _.set(state, "signUp.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.FETCH_ORG_LIST_SUCCESS, (state, { payload = {} }) => {
                _.set(state, "orgList", payload.data);
            });

    }
});

export const { actions, reducer } = slice;

/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import _ from "lodash";
const initialState = {
    isLoggedIn: false,
    orgAdmin: [],
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
            email: "",
            password: "",
            confirmPassword: "",
            info: {
                company_name: "",
                vessel_name: "",
                imo_number: "",
                mobile: "",
                userType: ""
            }
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
            ;

    }
});

export const { actions, reducer } = slice;

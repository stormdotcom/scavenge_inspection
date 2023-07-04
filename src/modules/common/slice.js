import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES as USER_ACTION_TYPES } from "../user-management/actions";
import { ACTION_TYPES as COMMON } from "../common/actions";
const initialState = {
    navigator: null,
    table: {},
    homePath: "home",
    user: {
        designation: "sss"
    },
    isLoggedIn: false
};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState,
        setNavigator: (state, action) => {
            state.navigator = action.payload;
        },
        setHomePath: (state, action) => {
            state.homePath = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(USER_ACTION_TYPES.SIGN_IN_SUCCESS, (state) => {
                state.isLoggedIn = true;
            })
            .addCase(USER_ACTION_TYPES.USER_PROFILE_SUCCESS, (state, { payload = {} }) => {
                state.user = payload.data;
            })
            .addCase(COMMON.LOG_OUT, (state) => {
                state.isLoggedIn = false;
                state.user = initialState.user;
            });

    }
});

export const { actions, reducer } = slice;

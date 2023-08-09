import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES as USER_ACTION_TYPES } from "../user-management/actions";
import { ACTION_TYPES as COMMON } from "../common/actions";
const initialState = {
    navigator: null,
    table: {},
    homePath: "signin",
    user: {
        subscription: {
            plan: ""
        },
        fullName: "",
        email: "",
        password: "",
        userType: "",
        organizationBelongsTo: {
            _id: "",
            company_name: ""
        },
        designation: "",
        __v: 0
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
        },
        clearLogout: (state) => {
            state.isLoggedIn = initialState.isLoggedIn;
            state.homePath = initialState.homePath;
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
            });

    }
});

export const { actions, reducer } = slice;

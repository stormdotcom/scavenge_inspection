/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
const initialState = {

    vesselList: {
        requestInProgress: false,
        data: []
    },
    pendingVesselRequest: {
        requestInProgress: false,
        data: []
    },
    createVesselModal: false,
    viewVesselDetailsModal: false,
    viewRequestDetails: {},
    createVessel: {
        requestInProgress: false,
        data: {
            vessel_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            manufacturer: "",
            type_of_engine: "",
            vessel_type: "",
            cylinder_numbers: "",
            imo_number: ""
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
        setModal: (state, { payload }) => {
            state.createVesselModal = payload;
        },
        setModalViewDetails: (state, { payload }) => {
            state.viewVesselDetailsModal = payload;
        },
        setRequestDetails: (state, { payload }) => {
            state.viewRequestDetails = payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.FETCH_VESSEL_LIST_REQUEST, (state) => {
                _.set(state, "vesselList.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_LIST_SUCCESS, (state, action) => {
                _.set(state, "vesselList.requestInProgress", false);
                _.set(state, "vesselList.data", action.payload.data);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_LIST_FAILURE, (state) => {
                _.set(state, "userDetails.requestInProgress", false);
            })
            // Pending request
            .addCase(ACTION_TYPES.VESSEL_REQUEST_LIST_REQUEST, (state) => {
                _.set(state, "pendingVesselRequest.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.VESSEL_REQUEST_LIST_SUCCESS, (state, action) => {
                _.set(state, "pendingVesselRequest.requestInProgress", false);
                _.set(state, "pendingVesselRequest.data", action.payload.data);
            })
            .addCase(ACTION_TYPES.VESSEL_REQUEST_LIST_FAILURE, (state) => {
                _.set(state, "pendingVesselRequest.requestInProgress", false);
            })
            //1
            .addCase(ACTION_TYPES.CREATE_VESSEL_REQUEST, (state) => {
                _.set(state, "pendingVesselRequest.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.CREATE_VESSEL_SUCCESS, (state) => {
                _.set(state, "pendingVesselRequest.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.CREATE_VESSEL_FAILURE, (state) => {
                _.set(state, "pendingVesselRequest.requestInProgress", false);
            });

    }
});

export const { actions, reducer } = slice;

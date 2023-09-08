/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import { COMMON_TABLE_PAGINATION } from "../common/constants";

const initialState = {
    vesselDetailList: {
        requestInProgress: false,
        table: {
            data: [],
            pageInfo: {
                ...COMMON_TABLE_PAGINATION
            },
            rowSelection: {},
            rowSelectionState: {},
            extraProps: {}
        }
    },
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
    },
    vesselDetails: {
        requestInProgress: false,
        data: {
            vessel_name: "",
            imo_number: "",
            manufacturer: "",
            type_of_engine: "",
            vessel_type: "",
            cylinder_numbers: "",
            _id: "",
            email: "",
            phone: ""
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
        },
        setPagination: (state, { payload }) => {
            state.vesselDetailList.table.pageInfo = payload;
        },
        setExtraProps: (state, { payload }) => {
            state.vesselDetailList.table.extraProps = payload;
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
            })

            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST_REQUEST, (state) => {
                _.set(state, "vesselDetailList.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST_SUCCESS, (state, { payload }) => {
                const { data, pageInfo = {} } = payload;
                _.set(state, "vesselDetailList.table.data", data);
                _.set(state, "vesselDetailList.table.pageInfo", pageInfo);
                _.set(state, "vesselDetailList.requestInProgress", false);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_LIST_FAILURE, (state) => {
                _.set(state, "vesselDetailList.requestInProgress", false);
            })

            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_BY_ID_REQUEST, (state) => {
                _.set(state, "vesselDetails.requestInProgress", true);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_BY_ID_SUCCESS, (state, { payload }) => {
                const { data, report } = payload;
                _.set(state, "vesselDetails.requestInProgress", false);
                _.set(state, "vesselDetails.data", data);
                _.set(state, "vesselDetails.report", report);
            })
            .addCase(ACTION_TYPES.FETCH_VESSEL_DETAILS_BY_ID_FAILURE, (state) => {
                _.set(state, "vesselDetails.requestInProgress", false);
            });


    }
});

export const { actions, reducer } = slice;

import { createAction } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";

export const ACTION_TYPES = {
    FETCH_VESSEL_LIST: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST`,
    FETCH_VESSEL_LIST_REQUEST: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_REQUEST`,
    FETCH_VESSEL_LIST_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_SUCCESS`,
    FETCH_VESSEL_LIST_FAILURE: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_FAILURE`,

    VESSEL_REQUEST_LIST: `${STATE_REDUCER_KEY}/VESSEL_REQUEST_LIST`,
    VESSEL_REQUEST_LIST_REQUEST: `${STATE_REDUCER_KEY}/VESSEL_REQUEST_LIST_REQUEST`,
    VESSEL_REQUEST_LIST_SUCCESS: `${STATE_REDUCER_KEY}/VESSEL_REQUEST_LIST_SUCCESS`,
    VESSEL_REQUEST_LIST_FAILURE: `${STATE_REDUCER_KEY}/VESSEL_REQUEST_LIST_FAILURE`,

    APPROVE_VESSEL: `${STATE_REDUCER_KEY}/APPROVE_VESSEL`,
    APPROVE_VESSEL_REQUEST: `${STATE_REDUCER_KEY}/APPROVE_VESSEL_REQUEST`,
    APPROVE_VESSEL_SUCCESS: `${STATE_REDUCER_KEY}/APPROVE_VESSEL_SUCCESS`,
    APPROVE_VESSEL_FAILURE: `${STATE_REDUCER_KEY}/APPROVE_VESSEL_FAILURE`


};

export const fetchVesselList = createAction(ACTION_TYPES.FETCH_VESSEL_LIST);
export const fetchVesselRequestList = createAction(ACTION_TYPES.VESSEL_REQUEST_LIST);
export const approveVessel = createAction(ACTION_TYPES.APPROVE_VESSEL);

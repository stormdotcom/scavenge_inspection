import { createAction } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";

export const ACTION_TYPES = {


    FETCH_USER_BY_ID: `${STATE_REDUCER_KEY}/FETCH_USER_BY_ID`,
    FETCH_USER_BY_ID_REQUEST: `${STATE_REDUCER_KEY}/FETCH_USER_BY_ID_REQUEST`,
    FETCH_USER_BY_ID_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_USER_BY_ID_SUCCESS`,
    FETCH_USER_BY_ID_FAILURE: `${STATE_REDUCER_KEY}/FETCH_USER_BY_ID_FAILURE`,

    FETCH_USERS_LIST: `${STATE_REDUCER_KEY}/FETCH_USERS_LIST`,
    FETCH_USERS_LIST_REQUEST: `${STATE_REDUCER_KEY}/FETCH_USERS_LIST_REQUEST`,
    FETCH_USERS_LIST_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_USERS_LIST_SUCCESS`,
    FETCH_USERS_LIST_FAILURE: `${STATE_REDUCER_KEY}/FETCH_USERS_LIST_FAILURE`,

    FETCH_DASHBOARD_STATS: `${STATE_REDUCER_KEY}/FETCH_DASHBOARD_STATS`,
    FETCH_DASHBOARD_STATS_REQUEST: `${STATE_REDUCER_KEY}/FETCH_DASHBOARD_STATS_REQUEST`,
    FETCH_DASHBOARD_STATS_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_DASHBOARD_STATS_SUCCESS`,
    FETCH_DASHBOARD_STATS_FAILURE: `${STATE_REDUCER_KEY}/FETCH_DASHBOARD_STATS_FAILURE`,

    FETCH_USERS: `${STATE_REDUCER_KEY}/FETCH_USERS`,
    FETCH_USERS_REQUEST: `${STATE_REDUCER_KEY}/FETCH_USERS_REQUEST`,
    FETCH_USERS_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_USERS_SUCCESS`,
    FETCH_USERS_FAILURE: `${STATE_REDUCER_KEY}/FETCH_USERS_FAILURE`,

    FETCH_VESSEL_LIST: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST`,
    FETCH_VESSEL_LIST_REQUEST: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_REQUEST`,
    FETCH_VESSEL_LIST_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_SUCCESS`,
    FETCH_VESSEL_LIST_FAILURE: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_FAILURE`,

    RESET_PASSWORD: `${STATE_REDUCER_KEY}/RESET_PASSWORD`,
    RESET_PASSWORD_REQUEST: `${STATE_REDUCER_KEY}/RESET_PASSWORD_REQUEST`,
    RESET_PASSWORD_SUCCESS: `${STATE_REDUCER_KEY}/RESET_PASSWORD_SUCCESS`,
    RESET_PASSWORD_FAILURE: `${STATE_REDUCER_KEY}/RESET_PASSWORD_FAILURE`,

    ALLOW_ACCESS: `${STATE_REDUCER_KEY}/ALLOW_ACCESS`,
    ALLOW_ACCESS_REQUEST: `${STATE_REDUCER_KEY}/ALLOW_ACCESS_REQUEST`,
    ALLOW_ACCESS_SUCCESS: `${STATE_REDUCER_KEY}/ALLOW_ACCESS_SUCCESS`,
    ALLOW_ACCESS_FAILURE: `${STATE_REDUCER_KEY}/ALLOW_ACCESS_FAILURE`,

    DISALLOW_ACCESS: `${STATE_REDUCER_KEY}/DISALLOW_ACCESS`,
    DISALLOW_ACCESS_REQUEST: `${STATE_REDUCER_KEY}/DISALLOW_ACCESS_REQUEST`,
    DISALLOW_ACCESS_SUCCESS: `${STATE_REDUCER_KEY}/DISALLOW_ACCESS_SUCCESS`,
    DISALLOW_ACCESS_FAILURE: `${STATE_REDUCER_KEY}/DISALLOW_ACCESS_FAILURE`,

    UPDATE_USER_DETAILS: `${STATE_REDUCER_KEY}/UPDATE_USER_DETAILS`,
    UPDATE_USER_DETAILS_REQUEST: `${STATE_REDUCER_KEY}/UPDATE_USER_DETAILS_REQUEST`,
    UPDATE_USER_DETAILS_SUCCESS: `${STATE_REDUCER_KEY}/UPDATE_USER_DETAILS_SUCCESS`,
    UPDATE_USER_DETAILS_FAILURE: `${STATE_REDUCER_KEY}/UPDATE_USER_DETAILS_FAILURE`,

    FETCH_VESSEL_LIST_TABLE: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_TABLE`,
    FETCH_VESSEL_LIST_TABLE_REQUEST: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_TABLE_REQUEST`,
    FETCH_VESSEL_LIST_TABLE_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_TABLE_SUCCESS`,
    FETCH_VESSEL_LIST_TABLE_FAILURE: `${STATE_REDUCER_KEY}/FETCH_VESSEL_LIST_TABLE_FAILURE`,

    FETCH_VESSEL_BY_ID: `${STATE_REDUCER_KEY}/FETCH_VESSEL_BY_ID`,
    FETCH_VESSEL_BY_ID_REQUEST: `${STATE_REDUCER_KEY}/FETCH_VESSEL_BY_ID_REQUEST`,
    FETCH_VESSEL_BY_ID_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_VESSEL_BY_ID_SUCCESS`,
    FETCH_VESSEL_BY_ID_FAILURE: `${STATE_REDUCER_KEY}/FETCH_VESSEL_BY_ID_FAILURE`,

    FETCH_ORG_TABLE: `${STATE_REDUCER_KEY}/FETCH_ORG_TABLE`,
    FETCH_ORG_TABLE_REQUEST: `${STATE_REDUCER_KEY}/FETCH_ORG_TABLE_REQUEST`,
    FETCH_ORG_TABLE_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_ORG_TABLE_SUCCESS`,
    FETCH_ORG_TABLE_FAILURE: `${STATE_REDUCER_KEY}/FETCH_ORG_TABLE_FAILURE`,

    FETCH_ORG_BY_ID: `${STATE_REDUCER_KEY}/FETCH_ORG_BY_ID`,
    FETCH_ORG_BY_ID_REQUEST: `${STATE_REDUCER_KEY}/FETCH_ORG_BY_ID_REQUEST`,
    FETCH_ORG_BY_ID_SUCCESS: `${STATE_REDUCER_KEY}/FETCH_ORG_BY_ID_SUCCESS`,
    FETCH_ORG_BY_ID_FAILURE: `${STATE_REDUCER_KEY}/FETCH_ORG_BY_ID_FAILURE`,

    FILTER_USER_LIST: `${STATE_REDUCER_KEY}/FILTER_USER_LIST`,
    FILTER_VESSEL_LIST: `${STATE_REDUCER_KEY}/FILTER_VESSEL_LIST`,
    FILTER_ORG_LIST: `${STATE_REDUCER_KEY}/FILTER_ORG_LIST`,

    UPDATE_ORG: `${STATE_REDUCER_KEY}/UPDATE_ORG`,
    UPDATE_ORG_REQUEST: `${STATE_REDUCER_KEY}/UPDATE_ORG_REQUEST`,
    UPDATE_ORG_SUCCESS: `${STATE_REDUCER_KEY}/UPDATE_ORG_SUCCESS`,
    UPDATE_ORG_FAILURE: `${STATE_REDUCER_KEY}/UPDATE_ORG_FAILURE`

};

export const fetchUserList = createAction(ACTION_TYPES.FETCH_USERS_LIST);
export const fetchUserById = createAction(ACTION_TYPES.FETCH_USER_BY_ID);
export const fetchDashboardCards = createAction(ACTION_TYPES.FETCH_DASHBOARD_STATS);
export const updateUser = createAction(ACTION_TYPES.UPDATE_USER_DETAILS);
export const resetPassword = createAction(ACTION_TYPES.RESET_PASSWORD);
export const allowAccess = createAction(ACTION_TYPES.ALLOW_ACCESS);
export const disAllowAccess = createAction(ACTION_TYPES.DISALLOW_ACCESS);
export const fetchVesselList = createAction(ACTION_TYPES.FETCH_VESSEL_LIST);
export const fetchVesselById = createAction(ACTION_TYPES.FETCH_VESSEL_BY_ID);
export const fetchOrgList = createAction(ACTION_TYPES.FETCH_ORG_TABLE);
export const fetchOrgById = createAction(ACTION_TYPES.FETCH_ORG_BY_ID);
export const userFilterSearch = createAction(ACTION_TYPES.FILTER_USER_LIST);
export const vesselFilterSearch = createAction(ACTION_TYPES.FILTER_VESSEL_LIST);
export const orgFilterSearch = createAction(ACTION_TYPES.FILTER_ORG_LIST);
export const updateOrg = createAction(ACTION_TYPES.UPDATE_ORG);

import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const signIn = (state) => state.signIn;
export const getSignIn = flow(getState, signIn);

const signUp = (state) => state.signUp;
export const getSignUp = flow(getState, signUp);

const createVessel = (state) => state.createVessel;
export const getCreateVessel = flow(getState, createVessel);

const pageInfo = (state) => state.vesselDetailList.table.pageInfo;
export const getTablePagination = flow(getState, pageInfo);

const extraProps = (state) => state.vesselDetailList.extraProps;
export const getExtraProps = flow(getState, extraProps);

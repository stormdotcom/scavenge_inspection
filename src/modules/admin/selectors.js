import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const userDetails = (state) => state.userDetails;
export const selectUserDetails = flow(getState, userDetails);

const tablePageInfo = (state) => state.table.pageInfo;
export const getTablePagination = flow(getState, tablePageInfo);

const extraProps = (state) => state.table.extraProps;
export const getExtraProps = flow(getState, extraProps);

const vesselDetails = (state) => state.vesselDetails;
export const selectVesselDetails = flow(getState, vesselDetails);

const orgDetails = (state) => state.orgDetails;
export const selectOrgDetails = flow(getState, orgDetails);

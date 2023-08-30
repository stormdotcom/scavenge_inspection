import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const userDetails = (state) => state.userDetails;
export const selectUserDetails = flow(getState, userDetails);

const pageInfo = (state) => state.usersList.table.pageInfo;
export const getPagingInfo = flow(getState, pageInfo);


const tablePageInfo = (state) => state.table.pageInfo;
export const getTablePagination = flow(getState, tablePageInfo);

const vesselDetails = (state) => state.vesselDetails;
export const selectVesselDetails = flow(getState, vesselDetails);

const orgDetails = (state) => state.orgDetails;
export const selectOrgDetails = flow(getState, orgDetails);

import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const userDetails = (state) => state.userDetails;
export const getUserDetails = flow(getState, userDetails);

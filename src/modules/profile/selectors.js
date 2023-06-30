import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const vesselDetails = (state) => state.vesselDetails;
export const getVesselDetails = flow(getState, vesselDetails);



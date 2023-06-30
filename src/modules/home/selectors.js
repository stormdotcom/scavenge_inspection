import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const vesselDetails = (state) => state.vesselDetails;
export const getVesselDetails = flow(getState, vesselDetails);

const cylinderNumber = (state) => state.vesselDetails.data.cylinderNumber;
export const getCylinderNumber = flow(getState, cylinderNumber);

const openImageUploader = (state) => state.openImageUploader;
export const getOpenImageUploader = flow(getState, openImageUploader);

const image = (state) => state.image;
export const getImageArray = flow(getState, image);

const currentCylinder = (state) => state.currentCylinder;
export const getCurrentCylinder = flow(getState, currentCylinder);

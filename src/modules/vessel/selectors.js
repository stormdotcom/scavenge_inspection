import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const inspectionDetails = (state) => state.inspectionDetails;
export const selectInspectionDetails = flow(getState, inspectionDetails);

const cylinder_numbers = (state) => state.inspectionDetails.data.cylinder_numbers;
export const getCylinderNumbers = flow(getState, cylinder_numbers);

const openImageUploader = (state) => state.openImageUploader;
export const getOpenImageUploader = flow(getState, openImageUploader);

const image = (state) => state.image;
export const getImageArray = flow(getState, image);

const currentCylinder = (state) => state.currentCylinder;
export const getCurrentCylinder = flow(getState, currentCylinder);

const tempVesselData = (state) => state.tempVesselData;
export const selectInspecDetailData = flow(getState, tempVesselData);

const predictedData = (state) => state.predictedData.data;
export const selectPredictedData = flow(getState, predictedData);

const paginationInfo = (state) => state.reports.table.pagingInfo;
export const getPagination = flow(getState, paginationInfo);

const tableExtraProps = (state) => state.reports.table.extraProps;
export const getExtraProps = flow(getState, tableExtraProps);

const reportDetails = (state) => state.reportDetails;
export const getReportDetails = flow(getState, reportDetails);

import React from "react";
import VesselInspectionDetails from "./VesselInspectionDetails";
import ImageUploader from "./Report/ImageUploader";
import ReportTable from "./ReportTable";
import Overlay from "./OverLay";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY as COMMON } from "../../common";

const HomeWrapper = () => {
    const approvedStatus = useSelector(state => state[COMMON].user?.approvedStatus);
    return <>
        <Overlay active={approvedStatus} />
        <VesselInspectionDetails />
        <ImageUploader />
        <ReportTable />
    </>;
};

export default HomeWrapper;

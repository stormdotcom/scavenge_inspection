import React from "react";
import VesselInspectionDetails from "./VesselInspectionDetails";
import ImageUploader from "./Report/ImageUploader";
import ReportTable from "./ReportTable";

const HomeWrapper = () => {
    return <>
        <VesselInspectionDetails />
        <ImageUploader />
        <ReportTable />
    </>;
};

export default React.memo(HomeWrapper);

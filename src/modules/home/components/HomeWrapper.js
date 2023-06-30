import React from "react";
import VesselDetails from "./VesselDetails";
import ImageUploader from "./Report/ImageUploader";
import ReportTable from "./ReportTable";

const HomeWrapper = () => {
    return <>
        <VesselDetails />
        <ImageUploader />
        <ReportTable />
    </>;
};

export default HomeWrapper;

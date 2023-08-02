import { Grid } from "@mui/material";
import React from "react";
import ReportOverView from "./Report/ReportOverView";
import ReportActions from "./Report/ReportActions";


const ReportTable = () => {
    return <Grid sx={{ px: 5, bgcolor: "primary.main", pb: 4, pt: 4 }}>
        <ReportOverView />
        <ReportActions />
    </Grid >;
};

export default ReportTable;

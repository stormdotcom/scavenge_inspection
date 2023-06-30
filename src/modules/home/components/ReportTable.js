import { Alert, Box, Grid } from "@mui/material";
import React from "react";
import ReportOverView from "./Report/ReportOverView";
import ReportActions from "./Report/ReportActions";


const ReportTable = () => {
    return <Grid sx={{ px: 5, bgcolor: "primary.main", pb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Alert severity="info"> Images once uploaded cannot be retrieved. You can only save or download generated reports </Alert>
        </Box>
        <ReportOverView />
        <ReportActions />
    </Grid>;
};

export default ReportTable;

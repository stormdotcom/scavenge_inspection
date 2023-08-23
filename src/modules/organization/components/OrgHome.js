import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import VesselRequestListBox from "./VesselRequestListBox";
import CreateVessel from "./CreateVessel";
import VesselListSlider from "./VesselListSlider";

const OrgHome = () => {
    const username = "Ajmal";
    return <>
        <Box sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", p: 2 }}>
            <Grid container rowSpacing={1}>
                <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 0.2, flexDirection: "column" }}>
                    <Typography sx={{ color: "secondary.main", fontSize: "16px", fontWeight: 700 }}> Welcome, {username} </Typography>
                    <Typography sx={{ color: "white.main", fontSize: "14px", display: "block" }}> Vessel List </Typography>
                </Box>
            </Grid>
            <VesselListSlider />
            <Grid container columnSpacing={2} rowSpacing={1} my={1}>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                    <VesselRequestListBox />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Box sx={{ width: "100%", height: "200px" }}>
                        <CreateVessel />
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Box sx={{ width: "100%", height: "200px" }}>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </>;
};

export default OrgHome;

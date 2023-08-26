import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
const AdminDashboard = () => {
    return <Box sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", p: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={4}>
            <Grid item xs={6} sm={6} md={7} lg={7} xl={7} p={1}>
                <Paper sx={{ width: "100%", height: "300px", bgcolor: "primary.light", display: "flex", justifyContent: "space-evenly", py: 2 }}>
                    <Box>
                        <Typography sx={{ fontSize: "30px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{"70"}</Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box><CorporateFareIcon sx={{ color: "secondary.light" }} /></Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Organizations"}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "30px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{"60"}</Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box><PeopleAltIcon sx={{ color: "secondary.light" }} /></Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Total Users"}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "30px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{"10"}</Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box><AdminPanelSettingsIcon sx={{ color: "secondary.light" }} /></Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Fleet Managers"}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "30px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{"400"}</Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box><DirectionsBoatIcon sx={{ color: "secondary.light" }} /></Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Vessels"}</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={5} lg={5} xl={5} p={1}>
                <Box sx={{ width: "100%", height: "300px", bgcolor: "green" }}>
                    <Typography> dsfdf </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>;
};

export default AdminDashboard;

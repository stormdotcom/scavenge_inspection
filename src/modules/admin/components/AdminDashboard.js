import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../constants";
import { fetchDashboardCards } from "../actions";
import { formatNumber } from "./utils";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";

const AdminDashboard = () => {
    const { data: { organizations = 0, totalUsers = 0, fleetManagers = 0, vessels = 0, reports = 0, cylinderImageCount = 0 } = {}, requestInProgress = false } =
        useSelector(state => state[STATE_REDUCER_KEY].dashboardCards);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDashboardCards());
    }, []);
    return <Box sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", px: 2, py: 4 }}>
        <Grid container rowSpacing={1} columnSpacing={4}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} p={1}>
                <LoadingCustomOverlay active={requestInProgress} spinnerProps="selectTagProp">
                    <Paper sx={{ width: "100%", minHeight: "150px", bgcolor: "primary.light", display: "flex", justifyContent: "space-evenly", py: 4 }}>
                        <Box>
                            <Typography sx={{ fontSize: "40px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{formatNumber(organizations)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><CorporateFareIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Organizations"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "40px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{formatNumber(totalUsers)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><PeopleAltIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Total Users"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "40px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{fleetManagers}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><AdminPanelSettingsIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Fleet Managers"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "40px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{vessels}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><DirectionsBoatIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Vessels"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </LoadingCustomOverlay>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} p={1}>
                <LoadingCustomOverlay active={requestInProgress} spinnerProps="selectTagProp">
                    <Paper sx={{
                        width: "100%", minHeight: "150px", bgcolor: "primary.light", display: "flex", justifyContent: "space-evenly", py: 4
                    }}>
                        <Box>
                            <Typography sx={{ fontSize: "40px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{formatNumber(reports)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><AssignmentIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Saved Reports"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "40px", fontWeight: 800, textAlign: "center", color: "orange.main" }}>{formatNumber(cylinderImageCount)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><ImageSearchIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "secondary.light" }}>{"Cylinder Images uploaded"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </LoadingCustomOverlay>
            </Grid>
        </Grid>
    </Box >;
};

export default AdminDashboard;

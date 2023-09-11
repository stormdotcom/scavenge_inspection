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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import { useNavigate } from "react-router-dom";
import SquareStatsCad from "./SquareStatsCad";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { data: { organizations = 0, totalUsers = 0, fleetManagers = 0, vessels = 0 } = {}, requestInProgress = false } =
        useSelector(state => state[STATE_REDUCER_KEY].dashboardCards);
    const dispatch = useDispatch();
    const { data: { reports = 0, cylinderImageCount = 0 } = {}, requestInProgress: cardTwoLoading = false } =
        useSelector(state => state[STATE_REDUCER_KEY].dashboardSecondaryCard);
    const { data = {}, requestInProgress: subStatsCardLoading = false } =
        useSelector(state => state[STATE_REDUCER_KEY].dashboardSubStatsCard);
    const { data: { totalRevenue, totalTransaction } = {}, requestInProgress: otherStatsCardLoading = false } =
        useSelector(state => state[STATE_REDUCER_KEY].dashboardOtherStatsCard);
    //dashboardOtherStatsCard
    useEffect(() => {
        dispatch(fetchDashboardCards());
    }, []);
    return <Box sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", px: 2, py: 4 }}>
        <Grid container rowSpacing={1} columnSpacing={4}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} p={1}>
                <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "secondary.dark", mb: 1 }}>{"User Stats"}</Typography>
                <LoadingCustomOverlay active={requestInProgress} spinnerProps="selectTagProp">
                    <Paper sx={{ width: "100%", minHeight: "150px", bgcolor: "primary.light", display: "flex", justifyContent: "space-evenly", py: 4 }}>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "20px", sm: "30px", md: "40px" }, fontWeight: { xs: 500, sm: 600, md: 800 }, textAlign: "center", color: "orange.main" }}>{formatNumber(organizations)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><CorporateFareIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: { xs: "11px", sm: "16px", md: "18px" }, fontWeight: { xs: 500, sm: 600 }, color: "secondary.light" }}>{"Organizations"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "20px", sm: "30px", md: "40px" }, fontWeight: { xs: 500, sm: 600, md: 800 }, textAlign: "center", color: "orange.main" }}>{formatNumber(totalUsers)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><PeopleAltIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: { xs: "11px", sm: "16px", md: "18px" }, fontWeight: { xs: 500, sm: 600 }, color: "secondary.light" }}>{"Total Users"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "20px", sm: "30px", md: "40px" }, fontWeight: { xs: 500, sm: 600, md: 800 }, textAlign: "center", color: "orange.main" }}>{fleetManagers}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><AdminPanelSettingsIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: { xs: "11px", sm: "16px", md: "18px" }, fontWeight: { xs: 500, sm: 600 }, color: "secondary.light" }}>{"Fleet Managers"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "20px", sm: "30px", md: "40px" }, fontWeight: { xs: 500, sm: 600, md: 800 }, textAlign: "center", color: "orange.main" }}>{vessels}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><DirectionsBoatIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: { xs: "11px", sm: "16px", md: "18px" }, fontWeight: { xs: 500, sm: 600 }, color: "secondary.light" }}>{"Vessels"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </LoadingCustomOverlay>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} p={1}>
                <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "secondary.dark", mb: 1 }}>{"Report Stats"}</Typography>
                <LoadingCustomOverlay active={cardTwoLoading} spinnerProps="selectTagProp">
                    <Paper sx={{
                        width: "100%", minHeight: "150px", bgcolor: "primary.light", display: "flex", justifyContent: "space-evenly", py: 4
                    }}>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "20px", sm: "30px", md: "40px" }, fontWeight: { xs: 500, sm: 600, md: 800 }, textAlign: "center", color: "orange.main" }}>{formatNumber(reports)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><AssignmentIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: { xs: "11px", sm: "16px", md: "18px" }, fontWeight: { xs: 500, sm: 600 }, color: "secondary.light" }}>{"Saved Reports"}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "20px", sm: "30px", md: "40px" }, fontWeight: { xs: 500, sm: 600, md: 800 }, textAlign: "center", color: "orange.main" }}>{formatNumber(cylinderImageCount)}</Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Box><ImageSearchIcon sx={{ color: "secondary.light" }} /></Box>
                                <Typography sx={{ fontSize: { xs: "11px", sm: "16px", md: "18px" }, fontWeight: { xs: 500, sm: 600 }, color: "secondary.light" }}>{"Cylinder Images uploaded"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </LoadingCustomOverlay>
            </Grid>
        </Grid>
        {/* subStatsCardLoading */}
        <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item sm={12} md={6} lg={7} xl={7}>
                <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "secondary.dark" }}>{"Subscription Stats"}</Typography>
                <LoadingCustomOverlay active={subStatsCardLoading} spinnerProps="selectTagProp">
                    <Box sx={{ height: "140x", width: "100%", mt: 1, p: 3, pl: 0, display: "flex" }}>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={12} sm={3}>
                                <SquareStatsCad value={data.freeTrail} type="Free Trial" title="Organizations" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <SquareStatsCad value={data.basic} type="BASIC" title="Organizations" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <SquareStatsCad value={data.pro} type="PRO" title="Organizations" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <SquareStatsCad value={data.premium} type="PREMIUM" title="Organizations" />
                            </Grid>
                        </Grid>
                    </Box>
                </LoadingCustomOverlay>
            </Grid>
            {/*  */}
            <Grid item sm={12} md={6} lg={5} xl={5} p={1}>
                <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "secondary.dark" }}>{"Other Stats"}</Typography>
                <LoadingCustomOverlay active={otherStatsCardLoading} spinnerProps="selectTagProp">
                    <Box sx={{ height: "140x", width: "100%", mt: 1, p: 3, pl: 0, display: "flex" }}>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={12} sm={6}>
                                <SquareStatsCad value={totalRevenue} type="Total Revenue" cardType="dark" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SquareStatsCad value={totalTransaction} type="Total Transaction" cardType="dark" />
                            </Grid>
                        </Grid>
                    </Box>
                </LoadingCustomOverlay>
            </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item sm={12} md={12} lg={12} xl={12} p={1}>
                <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "secondary.dark" }}>{"User Management"}</Typography>
                <Paper sx={{ height: "140x", width: "100%", bgcolor: "primary.light", mt: 1, p: 3, display: "flex", justifyContent: "center" }}>
                    <Grid container columnSpacing={4}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                            <Box onClick={() => navigate("../users")} sx={{ height: "140x", width: "100%", borderRadius: "15px", display: "flex", bgcolor: "primary.300", flexDirection: "column", mt: 1, p: 3, justifyContent: "center", "&:hover": { bgcolor: "primary.dark", cursor: "pointer" } }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start", my: 1, width: "100%" }} >
                                    <Box> <ManageAccountsIcon sx={{ color: "secondary.light" }} /></Box>
                                    <Typography sx={{ fontWeight: 600, pl: 1, color: "secondary.light" }}> Manage Users</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Box onClick={() => navigate("../organizations")} sx={{ height: "140x", width: "100%", borderRadius: "15px", display: "flex", bgcolor: "primary.300", flexDirection: "column", mt: 1, p: 3, justifyContent: "center", "&:hover": { bgcolor: "primary.dark", cursor: "pointer" } }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start", my: 1, width: "100%" }}>
                                    <Box>             <RoomPreferencesIcon sx={{ color: "secondary.light" }} /></Box>
                                    <Typography sx={{ fontWeight: 600, pl: 1, color: "secondary.light" }}> Organizations</Typography>
                                </Box>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Box onClick={() => navigate("../vessels")} sx={{ height: "140x", width: "100%", borderRadius: "15px", display: "flex", bgcolor: "primary.300", flexDirection: "column", mt: 1, p: 3, justifyContent: "center", "&:hover": { bgcolor: "primary.dark", cursor: "pointer" } }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start", my: 1, width: "100%" }}>
                                    <Box> <DirectionsBoatIcon sx={{ color: "secondary.light" }} /></Box>
                                    <Typography sx={{ fontWeight: 600, pl: 1, color: "secondary.light" }}> Vessels</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </Box >;
};

export default AdminDashboard;

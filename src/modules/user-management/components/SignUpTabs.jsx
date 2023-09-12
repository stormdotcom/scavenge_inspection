import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATE_REDUCER_KEY } from "../constants";
import { STATE_REDUCER_KEY as COMMON } from "../../common";
import { confirmDialog } from "../../../utils/notificationUtils";
import logoImg from "../../../assets/images/logoDark.png";
import backgroundImage from "../../../assets/images/vesselBg.jpg";
import TermsAndCondition from "../../common/TermsAndCondition/TermsAndCondition";
import { actions as commonSliceActions } from "../../common/slice";
import VesselSignUp from "./VesselSignUp";
import VesselOwner from "./VesselOwner";
const SignUpTabs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirmed = useSelector(state => state[STATE_REDUCER_KEY].signUp.confirm);
    const homePath = useSelector(state => state[COMMON].homePath);
    const handleTC = () => dispatch(commonSliceActions.toggleShowHideTC(true));
    const handleCloseTC = () => dispatch(commonSliceActions.toggleShowHideTC(false));
    const tcOpen = useSelector(state => state[COMMON].tcOpen);
    const [value, setValue] = React.useState(0);
    if (confirmed) {
        confirmDialog({
            title: "Account Created", showDenyButton: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/signin");
            }
        });
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return <>
        <Box sx={{ width: "240px", position: "relative" }}>
            <Box sx={{ display: "flex", position: "absolute", top: "5px", left: "10px" }}>
                <img
                    onClick={() => navigate(`../${homePath}`)}
                    style={{ cursor: "pointer" }}
                    alt="logo_scavenge"
                    src={logoImg}
                    width={60}
                    height={60}
                />
            </Box>
        </Box>

        <Grid height="100vh" container sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center"
        }}>
            <Box sx={{ mt: 3, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", mb: { lg: "130px", xl: "140px" } }}>
                <Paper sx={{ borderRadius: "20px", px: 1, border: "1px solid #AD7E14", boxShadow: 0, height: "90vh", width: { xs: "80%", sm: "70%", md: "560px", lg: "700px", xl: "700px" } }}>
                    <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                        <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                            <Typography sx={{ fontSize: { xs: "20px", md: "26px", lg: "30px", xl: "35px", textAlign: "center" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >Scav AI Vision</Typography>
                            <Divider sx={{ color: "primary.light" }} />
                            <Box sx={{ width: "100%" }}>
                                <Box sx={{ borderBottom: 1, width: "100%" }}>
                                    <Tabs sx={{ width: "100%" }} value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile >
                                        <Tab sx={{
                                            width: "50%",
                                            borderTopLeftRadius: "15px",
                                            fontSize: { xs: "12px", md: "14px" }, fontWeight: { sm: 500, md: 700 },
                                            "& .MuiTabs-indicator": {
                                                backgroundColor: "#fff",
                                                color: "#fff",
                                                height: "3px"
                                            },
                                            "&.Mui-selected": {
                                                backgroundColor: "#AD7E14"
                                            },
                                            "&.MuiTab-root": {
                                                color: "white.main"
                                            }

                                        }} label={"Fleet Manger"} />
                                        <Tab sx={{
                                            width: "50%",
                                            borderTopRightRadius: "15px",
                                            fontSize: { xs: "12px", md: "14px" }, fontWeight: { sm: 500, md: 700 },
                                            "&.Mui-selected": {
                                                backgroundColor: "#AD7E14"
                                            },
                                            "&.MuiTab-root": {
                                                color: "white.main"
                                            }

                                        }} label={"Vessel"} />
                                    </Tabs>
                                </Box>
                            </Box>
                            <Divider sx={{ width: "100%" }} />
                            {value === 0 && <VesselOwner />}
                            {value === 1 && <VesselSignUp />}
                            <Box sx={{ display: "flex", py: { xs: 3, xl: 4.5 }, justifyContent: "center", alignItems: "space-around", boxShadow: 0 }} elevation={0}>
                                <Typography display="inline" sx={{ fontSize: { lg: "16px", xl: "18px" }, pt: 0.6, color: "white.main" }}>{"Already have account?"}</Typography>
                                <Typography display="inline" variant="text" sx={{ fontWeight: 600, fontSize: { lg: "16px", xl: "18px" }, p: 0.5, m: 0, ml: 1, cursor: "pointer", "&:hover": { color: "#e8af13" } }} color="#e8af13"
                                    onClick={() => {
                                        navigate("../signin");
                                    }
                                    }>{"Sign-In"}</Typography>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography sx={{ color: "white.main", fontSize: { xs: "9px", md: "10px", lg: "11px", xl: "12px" } }}>Your sign-up confirms your acceptance of our {" "}
                                    <span onClick={handleTC} style={{ cursor: "pointer", textDecoration: "underline" }}>
                                        Terms and Conditions.</span> Welcome aboard!</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Paper >
            </Box>
            <TermsAndCondition handleClose={handleCloseTC} open={tcOpen} />
        </Grid ></>;
};

export default SignUpTabs;

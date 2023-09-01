import React from "react";
import "./overlay.css";
import { Box, Grid, Typography } from "@mui/material";
import bgImg from "../../../assets/images/vesselBg.jpg";
// eslint-disable-next-line no-unused-vars
import ContainedButton from "../../../common/components/custom/ContainedButton";

const overlayContent = {
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "600px"
};
const Overlay = ({ active = true }) => {
    return !active ? (
        <Box sx={{
            position: "fixed",
            top: "82px",
            left: 0,
            width: "100%",
            height: "calc(100% - 82px)",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            letterSpacing: "0.4px"
        }}>
            <Box sx={overlayContent}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "white.main" }}> Your Awaited Scavenge Scouting Awaits Administrative Approval.</Typography>
                <Grid sx={{ textAlign: "left", display: "flex", flexDirection: "column", mt: 3, justifyContent: "flex-start" }}>
                    <Typography sx={{ fontSize: "16px", color: "white.main" }}>We're getting ready to set sail on a scavenge inspection voyage, but we need a nod from our trusty Admin/Manager before you can come aboard. Hold tight, and we'll have you exploring the depths of ship engines in no time!
                    </Typography>
                    {/* <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 1 }}>
                        <Box>
                            <ContainedButton>{"Explore Features"} </ContainedButton>
                        </Box>
                        <Box>
                            <ContainedButton>{"Logout"} </ContainedButton>
                        </Box>
                    </Box> */}
                </Grid>
            </Box>

        </Box>
    ) : null;
};


export default Overlay;

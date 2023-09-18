import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import backgroundImage from "../../../assets/images/vesselBg.jpg";
import BackButton from "../../../common/components/custom/BackButton";
const DocumentationPage = () => {
    return <Grid height="100vh" container sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center"
    }}>
        <Box sx={{ mt: 3, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", mb: { lg: "130px", xl: "140px" } }}>
            <Paper sx={{ borderRadius: "20px", px: 1, border: "1px solid #AD7E14", boxShadow: 0, height: "90vh", width: "90%" }}>
                <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                        <Typography sx={{ fontSize: { xs: "20px", md: "26px", lg: "30px", xl: "35px", textAlign: "left" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >{"Documentation - Scavenge Inspection"}</Typography>
                        <BackButton path="../../signin" />
                        <Divider sx={{ color: "primary.light" }} />
                        <Box sx={{ width: "100%", overflowY: "scroll" }}>
                            <Box sx={{ borderBottom: 1, width: "100%" }}>
                            </Box>
                        </Box>
                        <Divider sx={{ width: "100%" }} />
                    </Box>
                </Grid>
            </Paper >
        </Box>
    </Grid >;

};

export default DocumentationPage;

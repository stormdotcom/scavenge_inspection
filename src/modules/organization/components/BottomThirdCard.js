import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ManageAccounts } from "@mui/icons-material";

const BottomThirdCard = () => {
    const navigate = useNavigate();

    return <Box sx={{ bgcolor: "primary.light", width: "80%", py: 0.8, px: 0.5, mt: 2, borderRadius: "5px", height: { sm: "180px", md: "220px", lg: "220px", xl: "380px" }, overflowY: "scroll" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ color: "secondary.main", mt: 2, ml: 3, borderRadius: "5px", fontSize: "14px", fontWeight: 700 }}> {"Manage Vessels"}</Typography>
        </Box>
        <Grid container columnSpacing={4} p={3}>
            <Grid item xl={12} >
                <Box onClick={() => navigate("../vessels")} sx={{ height: "140x", width: "100%", borderRadius: "15px", display: "flex", bgcolor: "primary.300", flexDirection: "column", mt: 1, p: 3, justifyContent: "center", "&:hover": { bgcolor: "primary.dark", cursor: "pointer" } }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", my: 1, width: "100%" }} >
                        <Box> <ManageAccounts sx={{ color: "secondary.light" }} /></Box>
                        <Typography sx={{ fontWeight: 600, pl: 1, color: "secondary.light" }}> See List</Typography>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    </Box >;
};

export default BottomThirdCard;

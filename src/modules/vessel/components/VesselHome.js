import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function VesselHome() {
    const navigate = useNavigate();
    return <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
            <Button variant="contained" sx={{ backgroundColor: "secondary.main" }} onClick={() => navigate("../prediction")}> Start Prediction </Button>
        </Box>
    </Grid>;
}
export default VesselHome;


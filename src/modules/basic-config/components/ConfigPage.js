import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import WavesIcon from "@mui/icons-material/Waves";

const ConfigPage = () => {
    const navigate = useNavigate();
    return <Box sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", px: 2, py: 4 }}>
        <Paper sx={{ height: "140x", width: "100%", bgcolor: "primary.light", mt: 1, p: 3 }}>
            <Grid container>
                <Grid item sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "140x", width: "100%", display: "flex", bgcolor: "primary.light", flexDirection: "column", mt: 1, p: 3, justifyContent: "center" }}>
                        <Box onClick={() => navigate("../users")} sx={{ display: "flex", justifyContent: "flex-start", my: 1, "&:hover": { bgcolor: "primary.dark", cursor: "pointer" }, width: "100%" }} >
                            <Box> <ManageAccountsIcon /></Box>
                            <Typography sx={{ fontWeight: 600, pl: 1 }}> Manage Users</Typography>
                        </Box>
                        <Box onClick={() => navigate("../organizations")} sx={{ display: "flex", justifyContent: "flex-start", my: 1, "&:hover": { bgcolor: "primary.dark", cursor: "pointer" }, width: "100%" }}>
                            <Box>             <RoomPreferencesIcon /></Box>
                            <Typography sx={{ fontWeight: 600, pl: 1 }}> Organizations</Typography>
                        </Box>
                        <Box onClick={() => navigate("../vessels")} sx={{ display: "flex", justifyContent: "flex-start", my: 1, "&:hover": { bgcolor: "primary.dark", cursor: "pointer" }, width: "100%" }}>
                            <Box> <WavesIcon /></Box>
                            <Typography sx={{ fontWeight: 600, pl: 1 }}> Vessels</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    </Box>;
};

export default ConfigPage;

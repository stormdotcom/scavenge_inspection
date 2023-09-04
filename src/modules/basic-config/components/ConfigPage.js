import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Draw, PriceChange } from "@mui/icons-material/";


const ConfigPage = () => {

    return <Box sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", px: 2, py: 4 }}>
        <Paper sx={{ height: "140x", width: "100%", bgcolor: "primary.light", mt: 1, p: 3 }}>
            <Grid container>
                <Grid item sm={12} md={6} lg={6} xl={6} columnSpacing={4}>
                    <Box sx={{ height: "140x", width: "100%", display: "flex", bgcolor: "primary.600", flexDirection: "column", mt: 1, p: 3, justifyContent: "center", "&:hover": { bgcolor: "primary.dark", cursor: "pointer" } }}>
                        <Box sx={{ display: "flex", justifyContent: "center", my: 1, width: "100%" }}>
                            <Box>  <Draw sx={{ color: "white.main" }} /></Box>
                            <Typography sx={{ fontWeight: 600, pl: 1, color: "white.main" }}> Modify Terms and Conditions </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "140x", width: "100%", display: "flex", bgcolor: "primary.600", flexDirection: "column", mt: 1, p: 3, justifyContent: "center", "&:hover": { bgcolor: "primary.dark", cursor: "pointer" } }}>
                        <Box sx={{ display: "flex", justifyContent: "center", my: 1, width: "100%" }}>
                            <Box> <PriceChange sx={{ color: "white.main" }} /></Box>
                            <Typography sx={{ fontWeight: 600, pl: 1, color: "white.main" }}> Subscriptions</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    </Box >;
};

export default ConfigPage;

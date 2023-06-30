import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import SelectInput from "./SelectComponent";

const ConditionsList = () => {
    return <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Typography sx={{ color: "white.main" }}> Breakage Condition</Typography>
        <Box>
            <SelectInput />
        </Box>
    </Grid>;
};

export default ConditionsList;

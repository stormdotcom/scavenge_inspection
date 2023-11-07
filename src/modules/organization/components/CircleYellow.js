import { Box, Typography } from "@mui/material";
import React from "react";
import { fromEpochToMuiDate } from "../../../utils/dateUtils";


const DateCircle = ({ latestInspectionDate = "" }) => {
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 0.8, position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 0.8, position: "absolute", top: "-10px", left: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", borderRadius: "50%", bgcolor: "#31313166", border: "1px solid black", width: "50px", height: "50px" }}>
                <Typography sx={{ fontSize: "9px", color: "secondary.light" }}> {"Latest"} </Typography>
                <Typography sx={{ fontWeight: { xs: 400, md: 600 }, fontSize: "9px", color: "secondary.light" }}> {fromEpochToMuiDate(latestInspectionDate)}</Typography>
            </Box>
        </Box>
    </Box>;
};

const CircleYellow = ({ latestInspectionDate = "", inspectionCount = 0 }) => {
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 0.8, my: 0.5, flexDirection: "column" }}>

        <DateCircle latestInspectionDate={latestInspectionDate} />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", bgcolor: "secondary.extraLight", width: "65px", height: "65px" }}>
            <Typography sx={{ fontWeight: 800, fontSi: "16px" }}> {inspectionCount}</Typography>
        </Box>
        <Box> <Typography sx={{ color: "white.main", display: "inline", fontWeight: 500, fontSize: { xs: "11px", md: "14px" } }}>{"Total Inspections"}</Typography></Box>
    </Box>;
};

export { CircleYellow };

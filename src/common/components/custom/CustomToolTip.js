import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const CustomToolTip = ({ info = "", icon }) => {
    return (
        <Box sx={{ width: "10px", height: "10px", position: "relative" }}>
            <Tooltip title={info} sx={{ position: "absolute", top: "-60px", left: "410px" }}>
                {<InfoIcon color="primary.200" fontSize="small" />}
            </Tooltip>
            {icon && icon()}
        </Box>
    );
};

export default CustomToolTip;

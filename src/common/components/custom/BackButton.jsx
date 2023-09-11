import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackButton = ({ path }) => {
    const navigate = useNavigate();
    return <Box sx={{ position: "relative" }}>
        <IconButton sx={{ position: "absolute", top: { xs: "-35px", md: "-65px" }, right: "10px", display: "flex", flexDirection: "column" }} onClick={() => navigate(`${path}`)}>
            <KeyboardBackspace sx={{ color: "secondary.main", fontSize: { xs: "11px", md: "14px" } }} />
            <Typography sx={{ color: "secondary.main", fontWeight: { xs: 400, md: 600 }, fontSize: { xs: "11px", md: "14px" } }}>Go Back</Typography>
        </IconButton>
    </Box>;
};

export default BackButton;

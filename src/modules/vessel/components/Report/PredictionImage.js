import React from "react";
import { Box, Typography } from "@mui/material";

const imageBoxStyle = {
    minWidth: "190px",
    minHeight: "190px",
    width: "100%",
    height: "180px",
    maxWidth: "195px",
    maxHeight: "180px",
    background: "color: var(--grayLight)",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundSize: "cover",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const PredictionImage = ({ image = "", cylinder }) => {


    return (
        <Box sm={6} md={3} lg={3} xl={3} sx={{ px: 2 }}>
            <Typography sx={{ color: "white.main", fontSize: "18px", fontWeight: 700 }}> Cylinder No: {cylinder}</Typography>
            <Box
                sx={{ ...imageBoxStyle, backgroundImage: `url(${image})`, backgroundColor: "primary.light" }}
            >
            </Box>
        </Box>
    );
};

export default PredictionImage;

import { Box } from "@mui/material";
import React from "react";
import sampleDocsImage from "../../../assets/images/docs/sample_ug-image.png";
const imageBoxStyle = {
    minWidth: "190px",
    minHeight: "190px",
    width: "1200px",
    height: "700px", // Change to "auto" to prevent Y-axis cropping
    maxWidth: "80%",
    maxHeight: "100%",
    background: "var(--grayLight)", // Fix the background property
    borderRadius: "5px",
    cursor: "pointer",
    backgroundSize: "cover",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "scroll" // Add horizontal scrolling

};

const ImageViewDocs = ({ imageUrl = sampleDocsImage }) => {
    return <Box sx={{
        display: "flex", justifyContent: "center", overflow: "auto"
    }}>
        <Box
            style={{ ...imageBoxStyle, backgroundImage: `url(${imageUrl})`, backgroundColor: "primary.light" }}
        >
        </Box>
    </Box>;
};

export default ImageViewDocs;

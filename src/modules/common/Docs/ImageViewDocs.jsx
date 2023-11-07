import { Box } from "@mui/material";
import React from "react";
import sampleDocsImage from "../../../assets/images/docs/sample_ug-image.png";
const imageBoxStyle = {
    background: "cover",
    minWidth: "190px",
    minHeight: "190px",
    maxHeight: "100%",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundSize: "cover",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

};

const ImageViewDocs = ({ imageUrl = sampleDocsImage }) => {
    return <Box sx={{
        display: "flex", justifyContent: "center", overflow: "auto"
    }}>
        <Box sx={{ overflowX: "scroll" }}>
            <img src={imageUrl} style={imageBoxStyle} />
        </Box>
    </Box>;
};

export default ImageViewDocs;

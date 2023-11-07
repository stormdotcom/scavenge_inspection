import React from "react";
import { Box, Grid, Typography } from "@mui/material";
function convertToCylinderFormat(inputString) {
    // Use a regular expression to find "cylinder" followed by a digit
    return inputString.replace(/cylinder(\d+)/i, (match, digit) => {
        return `Cylinder ${digit}`;
    });
}

function base64ToImageUrl(base64String, mimeType) {
    try {
        const bytes = atob(base64String);
        const byteNumbers = new Array(bytes.length);

        for (let i = 0; i < bytes.length; i++) {
            byteNumbers[i] = bytes.charCodeAt(i);
        }

        // eslint-disable-next-line no-undef
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        const imageUrl = URL.createObjectURL(blob);

        return imageUrl;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error converting Base64 to Image URL:", error);
        return null;
    }
}

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
    const mimeType = "image/png";
    const imageUrl = base64ToImageUrl(image, mimeType);
    return (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ px: 2, width: "100%" }}>
            <Typography sx={{ color: "white.main", fontSize: "18px", fontWeight: 700 }}>{convertToCylinderFormat(cylinder)}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box src={imageUrl}
                    style={{ ...imageBoxStyle, backgroundImage: `url(${imageUrl})`, backgroundColor: "primary.light" }}
                >
                </Box>
            </Box>
        </Grid>
    );
};

export default PredictionImage;

import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../constants";
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

const PredictionImage = ({ img }) => {
    const image = useSelector(state => state[STATE_REDUCER_KEY].image);

    return (
        <Box item sm={6} md={3} lg={3} xl={3}
            sx={{ ...imageBoxStyle, backgroundImage: `url(${image[img]})`, backgroundColor: "primary.light" }}
        >
            <img style={{ height: "auto", width: "50%" }} src="https://plus.unsplash.com/premium_photo-1661879449050-069f67e200bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1422&q=80" />
        </Box>
    );
};

export default PredictionImage;

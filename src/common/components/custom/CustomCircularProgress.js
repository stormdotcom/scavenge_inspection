import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Components } from "../../components";

const { Box, Typography } = Components;

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: "relative", display: "inline-flex", transform: "rotate(-70deg)" }}>
            <CircularProgress variant="determinate" value={props.value} />
            <Box
                sx={{
                    top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex",
                    alignItems: "center", justifyContent: "center", transform: "rotate(70deg)"
                }}>
                <Typography variant="caption" component="div" color="primary">
                    {props.text}
                </Typography>
            </Box>
        </Box>
    );
}

export default CircularProgressWithLabel;

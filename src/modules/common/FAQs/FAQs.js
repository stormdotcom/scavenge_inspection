import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const infoList = {
    px: 2,
    borderRight: "1px solid #009992",
    fontSize: "11px",
    display: {
        xs: "none",
        md: "block"
    }
};

const FAQs = ({ style = {} }) => {
    return (
        <Paper sx={style} elevation={0} >
            <Grid sx={{ display: "flex" }}>
                <Typography sx={infoList}>{"terms_of_service"}</Typography>
                <Typography sx={infoList}>{"privacy_policy"}</Typography>
                <Typography sx={{ pl: "10px", fontSize: "11px" }}>{"copyright"} </Typography>
            </Grid>
            <Paper sx={{
                position: "absolute", bottom: "-4px", left: "-28px", bgcolor: "#fff", width: "50px", height: "50px", background: "radial-gradient(97% 125% at left, transparent 50%, #fff 51%)", transform: "rotate(27deg)"
            }} elevation={0}>
            </Paper>
            <Paper sx={{
                position: "absolute", top: "-30px", right: "-6px", bgcolor: "#fff", width: "50px", height: "50px", background: "radial-gradient(97% 125% at right, transparent 50%, #fff 51%)", transform: "rotate(238deg)"
            }} elevation={0}>
            </Paper>
        </Paper>
    );
};

export default FAQs;

import { Card, Grid, Typography } from "@mui/material";
import React from "react";


const CardWithHeader = (props) => {
    const { children, title = "" } = props;
    return (
        <Card sx={{ boxShadow: "none", overflow: "visible", px: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} sm={12}>
                    <Typography sx={{ fontWeight: 500, fontSize: "32px", fontFamily: "Clash Display" }} variant="h4" component='p'> {title}</Typography>
                </Grid>
            </Grid>
            {children}
        </Card>
    );
};

export default CardWithHeader;

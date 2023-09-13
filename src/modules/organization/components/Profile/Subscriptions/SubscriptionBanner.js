import React from "react";
import { Paper, Typography, Divider, Grid, Chip, Box } from "@mui/material";
import { Icons } from "../../../../../common/components";
import ContainedButton from "../../../../../common/components/custom/ContainedButton";

const btnStyle = {
    bgcolor: "#F6F37F",
    color: "#000000",
    "&:hover": {
        backgroundColor: "#f5f16d"
    },
    fontWeight: { xs: 400, md: 600 }, textTransform: "upper-case", fontSize: { xs: "12px", xl: "14px" }, height: { xs: "30px", xl: "35px" }, my: 0.8
}
const SubScriptionBanner = ({ type = "", subTittle = "", premiumAmount, term = "Per month", features = [], active = false, customized = false }) => {
    const { CheckCircle, RemoveCircleOutline } = Icons;
    return (
        <Paper sx={{ m: 2, bgcolor: "primary.light", overflow: "visible", minWidth: "300px", maxWidth: "400px", p: 1, border: "2px solid #f0c246" }}>
            {active ? <Chip sx={{ position: "relative", top: "-20px", left: "40%", fontSize: "14px", fontWeight: 500 }} label="Active" color="primary" />
                : <Grid sx={{ height: "20px" }}> </Grid>}
            <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: 2 }}>
                <Grid>
                    <Typography sx={{ textAlign: "left", color: "white.main", fontSize: { xs: "25px", sm: "30px" }, fontWeight: { sm: 500, md: 700 } }}>{type} </Typography>
                    <Typography display={"inline"} sx={{ textAlign: "left", color: "white.main", fontSize: { xs: "10px", sm: "12px" }, fontWeight: 500 }}>{subTittle} </Typography>
                </Grid>
                {!customized && <Grid sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                    <Typography variant="h5" component="h5" sx={{ color: "white.main", fontSize: { xs: "25px", sm: "30px" }, fontWeight: { sm: 500, md: 700 } }}>{premiumAmount} </Typography>
                    <Typography variant="p" sx={{ color: "white.main", fontWeight: 400, fontSize: "12px" }}>{term}</Typography>
                </Grid>}
            </Grid>
            <Divider sx={{ color: "primary.light" }} />
            <Grid sx={{ p: 2 }}>
                <Grid sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
                    {features.map((item, i) => <Grid key={i} sx={{ display: "flex", width: "100%", justifyContent: "space-evenly", my: 0.5 }}>
                        <Grid sx={{ width: "10%", opacity: item.status ? "" : "0.5" }}>
                            {item.status ? <CheckCircle fontSize="small" sx={{ color: "green.main" }} />
                                : <RemoveCircleOutline fontSize="small" sx={{ color: "orange.default" }} />}
                        </Grid>
                        <Grid sx={{ width: "90%" }}> <Typography sx={{ color: "white.main" }}> {item?.name}</Typography> </Grid>
                    </Grid>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box>
                            <ContainedButton sx={btnStyle}>
                                {"Select Plan"}
                            </ContainedButton>
                        </Box>
                    </Box>

                </Grid>
            </Grid >
        </Paper >
    );
};

export default SubScriptionBanner;
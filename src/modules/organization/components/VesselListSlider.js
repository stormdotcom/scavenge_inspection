import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { STATE_REDUCER_KEY } from "../constants";
import { CircleYellow } from "./CircleYellow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVesselList } from "../actions";

const VesselListSlider = () => {
    const dispatch = useDispatch();
    const { data: vesselList = [], requestInProgress = false } = useSelector(state => state[STATE_REDUCER_KEY].vesselList);
    useEffect(() => {
        dispatch(fetchVesselList());
    }, []);
    return <Grid container columnSpacing={2} sx={{ display: "flex", justifyContent: "center" }}>
        <LoadingCustomOverlay active={requestInProgress} spinnerProps="selectTagProp">
            <Box sx={{ display: "flex", justifyContent: "flex-start", wrap: "nowrap", mt: 3, p: 0.5, width: { xs: "95vw", sm: "700px", md: "1000px", lg: "1300px", xl: "1900px" }, overflowX: "scroll" }}>
                {vesselList.map((ele, idx) => {
                    return (
                        <Box key={idx} sx={{ mx: 0.8, bgcolor: "primary.light", minWidth: "160px", minHeight: "90px", borderRadius: "5px" }}>
                            <Box sx={{ display: "flex", py: 2, justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                                <Typography sx={{ color: "white.main", fontWeight: 700 }}>{ele.vesselName}</Typography>
                                <Typography sx={{ color: "white.main", fontWeight: 500 }}>{ele.profileName}</Typography>
                            </Box>
                            <CircleYellow
                                latestInspectionDate={ele.latestInspectionDate}
                                inspectionCount={ele.inspectionCount}
                            />
                        </Box>
                    );
                })}
            </Box>
        </LoadingCustomOverlay>
    </Grid>;
};

export default VesselListSlider;

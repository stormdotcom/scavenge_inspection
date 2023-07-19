import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PredictionImage from "./PredictionImage";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../constants";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import _ from "lodash";

const ReportOverView = () => {
    const { data: { image = "", cylinder = "--", brk, dep, lub, surf } = {}, requestInProgress = false
    } = useSelector(state => state[STATE_REDUCER_KEY].predictedData);

    return <LoadingCustomOverlay active={requestInProgress}>
        <Grid container spacing={2} sx={{ bgcolor: "primary.200", display: "flex", p: 1, borderRadius: "5px" }}>
            <PredictionImage image={image} cylinder={cylinder} />
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} px={5}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box sx={{ py: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                            <Typography display={"inline"} sx={{ color: "white.main", fontSize: "14px", fontWeight: 600 }}>
                                Breakage
                            </Typography>
                        </Box>
                        {!_.isEmpty(brk) ? (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                {_.entries(brk).map(([key, value]) => (
                                    <Typography sx={{ color: "white.main" }} key={key}>
                                        {key}: {value}
                                    </Typography>
                                ))}
                            </Box>
                        ) : <Typography sx={{ color: "white.main" }} >
                            {"--"}
                        </Typography>}

                    </Box>
                    <Box sx={{ py: 2, minWidth: "300px" }}>
                        <Typography sx={{ color: "white.main", fontSize: "14px", fontWeight: 600 }}>
                            Deposits
                        </Typography>
                        {!_.isEmpty(dep) ? (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                {_.entries(dep).map(([key, value]) => (
                                    <Typography sx={{ color: "white.main" }} key={key}>
                                        {key}: {value}
                                    </Typography>
                                ))}
                            </Box>
                        ) : <Typography sx={{ color: "white.main" }} >
                            {"--"}
                        </Typography>}

                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box sx={{ py: 2 }}>
                        <Typography sx={{ color: "white.main", fontSize: "14px", fontWeight: 600 }}>
                            Lubrication  Condition
                        </Typography>
                        {!_.isEmpty(lub) ? (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                {_.entries(lub).map(([key, value]) => (
                                    <Typography sx={{ color: "white.main" }} key={key}>
                                        {key}: {value}
                                    </Typography>
                                ))}
                            </Box>
                        ) : <Typography sx={{ color: "white.main" }} >
                            {"--"}
                        </Typography>}

                    </Box>
                    <Box sx={{ py: 2, minWidth: "300px" }}>
                        <Typography sx={{ color: "white.main", fontSize: "14px", fontWeight: 600 }}>
                            Surface Condition
                        </Typography>
                        {!_.isEmpty(surf) ? (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                {_.entries(surf).map(([key, value]) => (
                                    <Typography sx={{ color: "white.main" }} key={key}>
                                        {key}: {value}
                                    </Typography>
                                ))}
                            </Box>
                        ) : <Typography sx={{ color: "white.main" }} >
                            {"--"}
                        </Typography>}

                    </Box>
                </Box>
            </Grid>
        </Grid>
    </LoadingCustomOverlay >
        ;
};

export default ReportOverView;

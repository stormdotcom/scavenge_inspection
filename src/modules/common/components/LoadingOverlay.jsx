import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { ScaleLoader, PulseLoader } from "react-spinners";
import palette from "../../../common/themes/palette.json";
import { Box, Typography } from "@mui/material";
import { GridLoader, DotLoader } from "react-spinners";

const DefaultLoader = () => <Box borderRadius={1} display="flex" justifyContent="center" alignItems="center" minHeight="10vh" maxWidth="10vw" backgroundColor="primary.dark" p={1} >
    <Box sx={{ textAlign: "center" }}>
        <GridLoader color="#f0c246" size={8} speedMultiplier={2} />
        <Typography sx={{ color: "secondary.light", fontSize: "12px", fontWeight: 800 }}> Loading Data... </Typography>
    </Box>
</Box >;

const PredictionLoader = () => <Box borderRadius={1} display="flex" justifyContent="center" alignItems="center" minHeight="10vh" maxWidth="10vw" backgroundColor="primary.dark" p={1} >
    <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
        <Box> <DotLoader color="#f0c246" size={25} speedMultiplier={1.4} /></Box>
        <Box>
            <Typography sx={{ textAlign: "center", color: "secondary.light", fontSize: "12px", fontWeight: 800 }}> Processing Data... </Typography>
        </Box>
    </Box>

</Box >;

const LoadingCustomOverlay = ({ active, children, spinnerProps = "" }) => {
    let loader = <ScaleLoader color={palette.palette.primary.main} />;

    switch (spinnerProps) {
        case "selectTagProp":
            loader = <PulseLoader color={palette.palette.primary.main} />;
            break;
        case "Prediction":
            loader = <PredictionLoader color={palette.palette.primary.main} />;
            break;
        case "custom":
            loader = <ScaleLoader color={palette.palette.primary.main} />;
            break;
        default:
            loader = <DefaultLoader />;
            break;
    }
    //Prediction
    return <LoadingOverlay
        active={active}
        styles={{
            overlay: (base) => ({
                ...base,
                background: "transparent",
                zIndex: 999
            })
        }}

        spinner={loader}
    >
        {children}
    </LoadingOverlay>;

};
export default LoadingCustomOverlay;

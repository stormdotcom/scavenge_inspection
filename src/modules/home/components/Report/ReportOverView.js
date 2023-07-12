import { Grid } from "@mui/material";
import React from "react";
import SimpleTable from "../../../common/components/SimpleTale";
import ConditionsList from "./ConditionsList";
import PredictionImage from "./PredictionImage";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../constants";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";

const columns = [
    { id: "ringNumber", name: "Ring Number" },
    { id: "lubricationCondition", name: "Lubrication Condition" },
    { id: "surfaceCondition", name: "Surface Condition" },
    { id: "depositsCondition", name: "Deposits Condition" }
];
const data = [
    { ringNumber: 1, lubricationCondition: "true", surfaceCondition: "S", depositsCondition: "LC" },
    { ringNumber: 2, lubricationCondition: "true", surfaceCondition: "S", depositsCondition: "" },
    { ringNumber: 3, lubricationCondition: "true", surfaceCondition: "S", depositsCondition: "" }
];
const ReportOverView = () => {
    const { data: { image = "" } = {}, requestInProgress = false
    } = useSelector(state => state[STATE_REDUCER_KEY].predictedData);

    return <LoadingCustomOverlay active={requestInProgress}>
        <Grid container spacing={2} sx={{ bgcolor: "primary.200", display: "flex", p: 1, borderRadius: "5px" }}>
            <PredictionImage image={image} />
            <Grid item sm={6} md={9} lg={9} xl={9}>
                <SimpleTable columns={columns} data={data} />
                <ConditionsList />
            </Grid>
        </Grid>
    </LoadingCustomOverlay>
        ;
};

export default ReportOverView;

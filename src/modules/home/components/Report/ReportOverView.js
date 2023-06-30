import { Grid } from "@mui/material";
import React from "react";
import SimpleTable from "../../../common/components/SimpleTale";
import ConditionsList from "./ConditionsList";
import PredictionImage from "./PredictionImage";

const columns = [
    { id: "ringNumber", name: "Ring Number" },
    { id: "lubricationCondition", name: "Lubrication Condition" },
    { id: "surfaceCondition", name: "Surface Condition" },
    { id: "depositsCondition", name: "Deposits Condition" }
];
const data = [
    { ringNumber: 1, lubricationCondition: "true", surfaceCondition: "adsssf", depositsCondition: "sdfsd" },
    { ringNumber: 2, lubricationCondition: "true", surfaceCondition: "adsssf", depositsCondition: "sdfsd" },
    { ringNumber: 3, lubricationCondition: "true", surfaceCondition: "adsssf", depositsCondition: "sdfsd" }
];
const ReportOverView = () => {
    return <Grid container spacing={2} sx={{ bgcolor: "primary.200", display: "flex", p: 1, borderRadius: "5px" }}>
        <PredictionImage />
        <Grid item sm={6} md={9} lg={9} xl={9}>
            <SimpleTable columns={columns} data={data} />
            <ConditionsList />
        </Grid>
    </Grid>;
};

export default ReportOverView;

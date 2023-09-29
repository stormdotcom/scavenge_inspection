import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import _ from "lodash";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { actions as sliceAction } from "../../../slice";
import { STATE_REDUCER_KEY, predictedDataCol, predictedDataColOrder } from "../../../constants";
import { fetchReportById } from "../../../actions";
import { getReportDetails } from "../../../selectors";
import LoadingCustomOverlay from "../../../../common/components/LoadingOverlay";
import { FormController } from "../../../../../common/components";
import { useParams } from "react-router-dom";
import PredictionImage from "../PredictionImage";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../../common/constants";
import CustomReactTable from "../../../../../common/components/custom/CustomReactTable";

const ReportDetails = (props) => {
    const { getReport, reportDetails } = props;
    const { id } = useParams();
    const { cylindersReport = {} } = reportDetails.data;

    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].reportDetails.requestInProgress);
    const columnsCylinderReport = useMemo(
        () => predictedDataCol,
        []
    );
    const options = {
        ...REACT_TABLE_COMMON_OPTIONS,
        enableRowActions: false,
        enableCustomPagination: false,
        state: {
            columnOrder: predictedDataColOrder
        }
    };
    useEffect(() => {
        getReport(id);
        return () => dispatch(sliceAction.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", p: 4 }}>
        <Paper elevation={2} sx={{ mt: 2, pb: 3, bgcolor: "primary.600" }}>
            <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", mt: 3, fontWeight: 700, pb: 1 }}> Report Details </Typography>
                <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                    <Form>
                        <LoadingCustomOverlay active={loading} >
                            <Grid container rowSpacing={1} columnSpacing={2}>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="inspection_date" label="Inspection Date" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="running_hrs_since_last" label="Running Hours since last Travel" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="total_running_hours" label="Total Running Hours" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="cyl_oil_Type" label="Cyl. Oil Type" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="cyl_oil_consump_Ltr_24hr" label="Cyl. Oil Consump(Ltr/24hr)" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="normal_service_load_in_percent_MCRMCR" label="Normal Service Load In %" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="normal_service_load_in_percent_MCR" label="Normal service load in % MCR" />
                                </Grid>
                                {/* <Grid item sm={12} md={6} lg={6} xl={4}>
                                    <FormController control="view" name="cylinder_numbers" label="Cylinders Number" />
                                </Grid> */}
                            </Grid>
                        </LoadingCustomOverlay >
                        <Grid sx={{ pt: 2 }}>
                            <Typography sx={{ color: "secondary.main", fontSize: "18px", mt: 3, fontWeight: 600, pb: 3 }}> Cylinder Predicted Report </Typography>
                            {_.map(cylindersReport, (value = {}, key) =>
                            (<Grid container key={key} spacing={2} sx={{ bgcolor: "primary.200", textAlign: "start", display: "flex", justifyContent: "space-evenly", p: 1, borderRadius: "5px" }}>
                                <PredictionImage image={value?.image} cylinder={key} />
                                {/* Table  data[key]*/}
                                <Grid item xs={12} sm={6} md={9} lg={9} xl={9}>
                                    <CustomReactTable
                                        data={value.predictionInfo || []}
                                        columns={columnsCylinderReport}
                                        options={options}
                                        enableRowVirtualization={false}
                                        enableCustomTableFilter={false}
                                    />
                                </Grid>
                                <Typography sx={{ color: "#ffff", fontWeight: 600 }}>Remarks :</Typography>
                                <Typography htmlFor="remarks-field" sx={{ color: "#ffff", fontWeight: 500 }}>{value?.remarks || "-"}</Typography>
                                <Divider sx={{
                                    width: "100%",
                                    bgcolor: "primary.dark"
                                }} variant="inset" />
                            </Grid>)
                            )}
                        </Grid>
                    </Form>
                </Box>
            </Box>
        </Paper>
    </Grid >;
};


const mapStateToProps = createStructuredSelector({
    reportDetails: getReportDetails
});

const mapDispatchToProps = (dispatch) => ({
    getReport: (id) => dispatch(fetchReportById(id))
});

const reportDetailsForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.reportDetails.data;
    },
    displayName: "ReportDetailsForm"
})(ReportDetails);

export default connect(mapStateToProps, mapDispatchToProps)(reportDetailsForm);

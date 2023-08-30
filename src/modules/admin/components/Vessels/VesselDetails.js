import React, { useEffect } from "react";
import { STATE_REDUCER_KEY } from "../../constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions as sliceActions } from "../../slice";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { Form, withFormik } from "formik";
import { FormController } from "../../../../common/components";
import { createStructuredSelector } from "reselect";
import { selectVesselDetails } from "../../selectors";
import { fetchVesselById } from "../../actions";
import { useNavigate, useParams } from "react-router-dom";

const VesselDetailsView = (props) => {
    const navigate = useNavigate();
    const { getVesselById } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].vesselDetails.requestInProgress);
    const { id = 0 } = useParams();
    useEffect(() => {
        getVesselById(id);
        return () => dispatch(sliceActions.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Paper sx={{ px: 3, pt: 4, width: "100%", bgcolor: "primary.light" }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Vessel Details </Typography>
                <Box sx={{ position: "relative" }}>
                    <IconButton sx={{ position: "absolute", top: "-65px", right: "10px", display: "flex", flexDirection: "column" }} onClick={() => navigate("../vessels")}>
                        <KeyboardBackspaceIcon sx={{ color: "secondary.main" }} />
                        <Typography sx={{ color: "secondary.main" }}>Go Back</Typography>
                    </IconButton>
                </Box>

                <Form>
                    <LoadingCustomOverlay active={loading}>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="vesselDetails.vessel_name" label="Vessel Name" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="vesselDetails.imo_number" label="IMO Number" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="vesselDetails.manufacturer" label="Manufacturer" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="vesselDetails.type_of_engine" label="Type of engine" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="vesselDetails.vessel_type" label="Vessel Type" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.inspection_date" label="Latest Inspection Date" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.normal_service_load_in_percent_MCRMCR" label="Normal Service Load (%)" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.total_running_hours" label="Total Running Hours" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.running_hrs_since_last" label="Last Running Hours" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.cyl_oil_Type" label="Cylinder Oil Type" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.cyl_oil_consump_Ltr_24hr" label="Cylinder Oil Consumption Last 24 hours" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.normal_service_load_in_percent_MCR" label="Normal Service Load (%)" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDetails.cylinder_numbers" label="No. of Cylinders" disabled={true} />
                            </Grid>
                        </Grid>
                    </LoadingCustomOverlay>
                    <Paper sx={{ px: 3, pt: 4, my: 2, pb: 2, width: "100%" }}>
                        <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Organizations Details </Typography>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="organizationBelongsTo.company_name" label="Company Name" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="officerAdmin.fullName" label="Fleet Manager" disabled={true} />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper sx={{ px: 3, pt: 4, my: 2, width: "100%" }}>
                        <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Subscription Details </Typography>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="subscription.plan" label="Plan" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="subscription.startDate" label="Plan Start Date" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="subscription.startDate" label="Plan End Date" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="subscription.transactionId" label="Transaction ID" disabled={true} />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid sx={{ display: "flex", pb: 4, justifyContent: "center", alignItems: "center" }}>
                    </Grid>
                </Form>
            </Paper>
        </Box>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    vesselDetails: selectVesselDetails
});

const mapDispatchToProps = (dispatch) => ({
    getVesselById: (id) => dispatch(fetchVesselById(id))
});

const VesselDetailsViewForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.vesselDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselDetailsViewForm"
})(VesselDetailsView);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsViewForm);


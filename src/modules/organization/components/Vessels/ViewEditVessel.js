import React from "react";
import { FormController } from "../../../../common/components";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { connect } from "react-redux";
import { Form, withFormik } from "formik";
import { createStructuredSelector } from "reselect";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { fetchVesselById } from "../../actions";
import { getVesselDetails } from "../../selectors";

const ViewEditVessel = (props) => {
    const { vesselDetails: { requestInProgress = false } = {} } = props;
    return <Grid sx={{ width: "100%", minHeight: "90vh", p: 4 }}>
        <Paper elevation={2} sx={{ mt: 2, pb: 3, bgcolor: "primary.600" }}>
            <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", mt: 3, fontWeight: 700, pb: 1 }}> Report Details </Typography>
                <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                    <Form>
                        <LoadingCustomOverlay active={requestInProgress} >
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

                    </Form>
                </Box>
            </Box>
        </Paper>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    vesselDetails: getVesselDetails
});

const mapDispatchToProps = (dispatch) => ({
    getVessel: (id) => dispatch(fetchVesselById(id))
});

const vesselDetailsForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.vesselDetails.data;
    },
    displayName: "VesselDetailsForm"
})(ViewEditVessel);
export default connect(mapStateToProps, mapDispatchToProps)(vesselDetailsForm);



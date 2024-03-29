import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectInspectionDetails } from "../selectors";
import { getInspectionDetails, showPredictions } from "../actions";
import { vesselDetailsSchema as validate } from "../validate";
import { actions as sliceActions } from "../slice";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { STATE_REDUCER_KEY } from "../constants";


const VesselDetails = (props) => {
    const { handleSubmit, fetchFormData } = props;
    const loading = useSelector(state => state[STATE_REDUCER_KEY].inspectionDetails.requestInProgress);
    const imageUploaded = useSelector(state => state[STATE_REDUCER_KEY].imageUploaded);
    const dispatch = useDispatch();
    const handleUpload = () => {
        dispatch(sliceActions.setImageUploader(true));
        handleSubmit();
    };
    const handleShowPredictions = () => {
        dispatch(showPredictions());
    };
    useEffect(() => {
        fetchFormData();
    }, []);

    return <LoadingCustomOverlay active={loading} spinnerProps="Prediction">
        <Grid sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Treeswise </Typography>
                <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                    <Form>
                        <Grid container rowSpacing={4} columnSpacing={4}>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="date2" name="inspection_date" label="Inspection Date" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="normal_service_load_in_percent_MCR" label="Normal service load in % MCR" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="total_running_hours" label="Total Running Hours" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="running_hrs_since_last" label="Running Hours since last" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="cyl_oil_Type" label="Cyl. Oil Type" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="cyl_oil_consump_Ltr_24hr" label="Cyl. Oil Consump(Ltr/24hr)" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="normal_service_load_in_percent_MCRMCR" label="Normal Service Load in %" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="cylinder_numbers" label="Cylinder Numbers" disabled={true} />
                            </Grid>
                            {/* 2 */}
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button onClick={handleUpload} sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" >{"Upload Cylinder Image"}</Button>
                            <Button variant="contained" onClick={handleShowPredictions} sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} disabled={!imageUploaded}>Start Prediction </Button>
                        </Grid>
                    </Form>
                </Box>
            </Box>
        </Grid >
    </LoadingCustomOverlay>;
};


const mapStateToProps = createStructuredSelector({
    vesselInspectionDetails: selectInspectionDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(sliceActions.setInspectionDetails(data)),
    fetchFormData: () => dispatch(getInspectionDetails())
});

const VesselDetailsForm = withFormik({
    enableReinitialize: true,
    validationSchema: validate,
    mapPropsToValues: (props) => {
        return props.vesselInspectionDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselInspectionDetailsForm"
})(VesselDetails);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsForm);

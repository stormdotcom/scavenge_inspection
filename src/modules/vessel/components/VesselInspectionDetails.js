import { Alert, Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectInspectionDetails } from "../selectors";
import { getInspectionDetails } from "../actions";
import { vesselDetailsSchema as validate } from "../validate";
import { actions as sliceActions } from "../slice";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { STATE_REDUCER_KEY } from "../constants";
import { STATE_REDUCER_KEY as COMMON_KEY } from "../../common";
import ContainedButton from "../../../common/components/custom/ContainedButton";

const VesselDetails = (props) => {
    const { handleSubmit, fetchFormData } = props;
    const loading = useSelector(state => state[STATE_REDUCER_KEY].inspectionDetails.requestInProgress);
    const { company_name = "" } = useSelector(state => state[COMMON_KEY].user.organizationBelongsTo);
    const fullName = useSelector(state => state[COMMON_KEY].user.fullName);
    const dispatch = useDispatch();
    const handleUpload = () => {
        dispatch(sliceActions.setImageUploader(true));
        handleSubmit();
    };
    useEffect(() => {
        fetchFormData();
        return () => dispatch(sliceActions.clearForm());
    }, []);

    return <>
        <Grid sx={{ width: "100%", minHeight: "30vh", bgcolor: "primary.main", p: 4 }}>
            <LoadingCustomOverlay active={loading} spinnerProps="Prediction">
                <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
                    <Typography sx={{ color: "secondary.main", fontSize: { xs: "11px", sm: "13px", md: "28px" }, fontWeight: 600, pb: 1 }}> {`${fullName} (${company_name})`} </Typography>
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
                                    <FormController control="input2" name="normal_service_load_in_percent_MCRMCR" label="Normal Service Load In %" />
                                </Grid>
                                {/* 2 */}
                            </Grid>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ContainedButton onClick={handleUpload} >{"Upload Cylinder Image"}</ContainedButton>
                            </Grid>
                        </Form>
                    </Box>
                </Box>
            </LoadingCustomOverlay >
        </Grid >

        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", width: { xs: "80%", md: "100%" } }}>
                <Alert severity="info" sx={{ fontSize: { xs: "12px", md: "16px" } }}> Images once uploaded cannot be retrieved. You can only save or download generated reports </Alert>
            </Box>
        </Box></>;
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
    displayName: "VesselInspectionDetailsForm2"
})(VesselDetails);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsForm);

import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import { getOpenImageUploader, getVesselDetails } from "../selectors";
import { getInspectionDetails, updateVessel } from "../actions";
import { vesselDetailsSchema as validate } from "../validate";
import { actions as sliceActions } from "../slice";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { STATE_REDUCER_KEY } from "../constants";

const VesselDetails = (props) => {
    const { handleSubmit, fetchFormData } = props;
    const loading = useSelector(state => state[STATE_REDUCER_KEY].vesselDetails.requestInProgress)
    const dispatch = useDispatch();
    const handleUpload = () => {
        dispatch(sliceActions.setImageUploader(true));
        handleSubmit();
    };
    useEffect(() => {
        fetchFormData();
        return () => dispatch(sliceActions.clearForm());
    }, []);

    return <LoadingCustomOverlay active={loading}>
        <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Treeswise </Typography>
                <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="inspectionDate" label="Inspection Date" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="serviceLoad" label="Normal service load in % MCR" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="totalRunningHours" label="Total Running Hours" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="lastRunningHours" label="Running Hours since last" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="cylinderOilType" label="Cyl. Oil Type" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="cylinderOilConsump" label="Cyl. Oil Consump(Ltr/24hr)" />
                            </Grid>
                            {/* 2 */}
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleUpload}>{"Upload Cylinder Image"}</Button>
                        </Grid>
                    </Form>
                </Box>
            </Box>
        </Grid >
    </LoadingCustomOverlay>;
};


const mapStateToProps = createStructuredSelector({
    vesselDetails: getVesselDetails,
    openImageUploader: getOpenImageUploader
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(updateVessel(data)),
    fetchFormData: () => dispatch(getInspectionDetails())
});

const VesselDetailsForm = withFormik({
    enableReinitialize: false,
    validationSchema: validate,
    mapPropsToValues: (props) => {
        return props.vesselDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselDetailsForm"
})(VesselDetails);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsForm);

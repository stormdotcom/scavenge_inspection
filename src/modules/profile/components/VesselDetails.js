import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import { getVesselDetails } from "../selectors";
import { fetchVesselInfoDetails, updateVessel } from "../actions";
import { vesselDetailsSchema as validate } from "../validate";
import { useEffect } from "react";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { actions as sliceAction } from "../slice";
import { STATE_REDUCER_KEY } from "../constants";

const VesselDetails = (props) => {
    const { handleSubmit, getVesselInfoDetails } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].vesselDetails.requestInProgress);
    useEffect(() => {
        getVesselInfoDetails();
        return () => dispatch(sliceAction.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2, textAlign: "center" }}>
            <Typography sx={{ color: "secondary.main", fontSize: { xs: "11px", sm: "13px", md: "28px" }, fontWeight: 600, pb: 1 }}> VESSEL PROFILE </Typography>
            <Paper sx={{ bgcolor: "primary.light", px: 2, pt: 4, pb: 2, width: "100%" }}>
                <LoadingCustomOverlay active={loading} >
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="vessel_name" label="Vessel Name" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="imo_number" label="IMO Number" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="manufacturer" label="Manufacturer" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="type_of_engine" label="Engine Type" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="vessel_type" label="Vessel Type" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="cylinder_numbers" label="Number of Cylinders" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="phone" label="Contact Number" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="email" label="Email Address" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="fleetManager" label="Fleet Manager" disabled={true} />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Save"}</Button>
                        </Grid>
                    </Form>
                </LoadingCustomOverlay>
            </Paper>
        </Box>
    </Grid >;
};


const mapStateToProps = createStructuredSelector({
    vesselDetails: getVesselDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(updateVessel(data)),
    getVesselInfoDetails: data => dispatch(fetchVesselInfoDetails(data))
});

const VesselDetailsProfileForm = withFormik({
    enableReinitialize: true,
    validationSchema: validate,
    mapPropsToValues: (props) => {
        return props.vesselDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselDetailsProfileForm"
})(VesselDetails);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsProfileForm);

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect } from "react-redux";
import { getVesselDetails } from "../selectors";
import { updateVessel } from "../actions";
import { vesselDetailsSchema as validate } from "../validate";

const VesselDetails = (props) => {
    const { handleSubmit } = props;
    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Treeswise </Typography>
            <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                <Form>
                    <Grid container rowSpacing={2} columnSpacing={4}>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="vesselName" label="Vessel Name" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="imoNumber" label="IMO Number" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="manufacturer" label="Manufacturer" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="engineType" label="Engine Type" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="vesselType" label="Vessel Type" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="inspectionDate" label="Inspection Date" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="cylinderNumber" label="Cylinder Number" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="totalRunningHours" label="Total Running Hours" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="cylinderOilType" label="Cyl. Oil Type" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="cylinderOilConsump" label="Cyl. Oil Consump(Ltr/24hr)" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="serviceLoad" label="Normal service load in % MCR" />
                        </Grid>
                    </Grid>
                    <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Update Details"}</Button>
                    </Grid>
                </Form>
            </Box>
        </Box>
    </Grid >;
};


const mapStateToProps = createStructuredSelector({
    vesselDetails: getVesselDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(updateVessel(data))
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

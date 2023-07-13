import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import { getVesselDetails } from "../selectors";
import { fetchVesselInfoDetails, updateVessel } from "../actions";
import { vesselDetailsSchema as validate } from "../validate";
import { useEffect } from "react";

const VesselDetails = (props) => {
    const { handleSubmit, getVesselInfoDetails } = props;
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(getVesselInfoDetails());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Update Vessel Details </Typography>
            <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                <Form>
                    <Grid container rowSpacing={2} columnSpacing={4}>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="vesselName" label="Vessel Name" disabled />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="imo_number" label="IMO Number" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="manufacturer" label="Manufacturer" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="type_of_engine" label="Engine Type" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} xl={4}>
                            <FormController control="input2" name="vessel_type" label="Vessel Type" />
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
    submit: data => dispatch(updateVessel(data)),
    getVesselInfoDetails: data => dispatch(fetchVesselInfoDetails(data))
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
    displayName: "vesselDetailsForm"
})(VesselDetails);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsForm);

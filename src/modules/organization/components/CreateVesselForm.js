import { Box, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, withFormik } from "formik";
import _ from "lodash";

import { FormController } from "../../../common/components";
import { createStructuredSelector } from "reselect";
import { getCreateVessel } from "../selectors";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
import { createVesselSchema as validationSchema } from "../validate";
import { createVesselAsync } from "../actions";
import ContainedButton from "../../../common/components/custom/ContainedButton";

const CreateVesselForm = (props) => {
    const { handleSubmit, createVessel = {}, errors = {} } = props;
    const [next, setNext] = useState(false);
    const goBack = () => setNext(false);
    const goNext = () => setNext(true);
    const { requestInProgress = false } = createVessel;

    const handleConfirm = () => {
        if (!_.isEmpty(errors)) {
            setNext(false);
        }
        handleSubmit();
    };
    return <Box>
        <LoadingCustomOverlay active={requestInProgress} spinnerProps="selectTagProp">
            <Box sx={{ height: { xs: "70vh", sm: "80vh", md: "60vh", diplay: "flex", justifyContent: "center" }, overflowY: "scroll" }}>
                <Form>
                    <Grid container rowSpacing={3} columnSpacing={3}>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="fullName" label="Full Name" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="vessel_name" label="Vessel Name" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="imo_number" label="IMO Number" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="vessel_type" label="Vessel Type" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="type_of_engine" label="Engine Type" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="manufacturer" label="Engine Manufacturer" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="cylinder_numbers" label="Number of Cylinders" disabled={next} isMandatory={true} />
                        </Grid>
                        <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="email" label="Email ID" disabled={next} isMandatory={true} />
                        </Grid>
                        {next && <Grid item sm={12} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                            <FormController control="input" name="password" label="Enter Password" isMandatory={true} />
                        </Grid>}
                        {next && <Grid item sm={8} md={8} lg={8} xl={8} sx={{ display: { xs: "none" }, my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                            <Paper sx={{ borderRadius: "10px", width: "90%", height: "230px" }}>
                            </Paper>
                        </Grid>}
                        {next && <Grid item sm={4} md={4} lg={4} xl={4} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                            <FormController control="input" name="confirmPassword" label="Confirm Password" isMandatory={true} />
                        </Grid>}
                        <Grid item sm={4} md={4} lg={4} xl={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", position: "relative" }}>
                        <Box sx={{ position: "absolute", top: "-35px", right: "20px" }}>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: { sm: "center", md: "flex-end" } }}>
                        <Box>
                            {next && <ContainedButton onClick={goBack} variant="outlined" color="secondary" >
                                Go Back
                            </ContainedButton>}
                            {!next && <ContainedButton onClick={goNext} variant="contained" color="secondary" >
                                Continue
                            </ContainedButton>}
                            {next && <ContainedButton onClick={handleConfirm} >{"Confirm"}</ContainedButton>}
                        </Box>
                    </Box>
                </Form>
            </Box>
        </LoadingCustomOverlay >
    </Box >;
};
const mapStateToProps = createStructuredSelector({
    createVessel: getCreateVessel
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => {
        dispatch(createVesselAsync(data));
    }
});

const CreateVesselFormModal = withFormik({
    enableReinitialize: false,
    validationSchema: validationSchema,
    mapPropsToValues: (props) => {
        return props.createVessel.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "CreateVesselForm"
})(CreateVesselForm);

export default connect(mapStateToProps, mapDispatchToProps)(CreateVesselFormModal);


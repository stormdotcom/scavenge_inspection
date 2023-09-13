import { Form, withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FormController } from "../../../../common/components";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { actions as sliceAction } from "../../slice";
import { getProfileManager } from "../../selectors";
import { STATE_REDUCER_KEY } from "../../constants";
import { fetchManagerProfile } from "../../actions";
const ManagerProfile = (props) => {
    const { handleSubmit, getManagerProfile } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].profile.requestInProgress);
    useEffect(() => {
        getManagerProfile();
        return () => dispatch(sliceAction.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2, textAlign: "start" }}>
            <Typography sx={{ color: "secondary.main", fontSize: { xs: "11px", sm: "13px", md: "28px" }, fontWeight: 600, pb: 1 }}>  </Typography>
            <Paper sx={{ bgcolor: "primary.light", px: 2, pt: 4, pb: 2, width: "100%" }}>
                <LoadingCustomOverlay active={loading} >
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="fullName" label="Name" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="email" label="Email Address" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="phone" label="Phone" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="company_name" label="Organization" disabled={true} />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ContainedButton variant="contained" type="submit" disabled={true} onClick={handleSubmit}>{"Save"}</ContainedButton>
                        </Grid>
                    </Form>
                </LoadingCustomOverlay>
            </Paper>
        </Box>
    </Grid >;
};


const mapStateToProps = createStructuredSelector({
    profile: getProfileManager
});

const mapDispatchToProps = (dispatch) => ({
    // submit: data => dispatch(updateVessel(data))
    getManagerProfile: () => dispatch(fetchManagerProfile())
});

const ManagerProfileForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.profile.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselDetailsProfileForm"
})(ManagerProfile);

export default connect(mapStateToProps, mapDispatchToProps)(ManagerProfileForm);

import React, { useEffect } from "react";
import { STATE_REDUCER_KEY } from "../../constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions as sliceAction } from "../../../common/slice";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { Form, withFormik } from "formik";
import { FormController } from "../../../../common/components";
import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../../selectors";
import { fetchUserById, updateUser } from "../../actions";
import { useParams } from "react-router-dom";

const UserDetails = (props) => {
    const { handleSubmit, getUserById } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].userDetails.requestInProgress);
    const { id } = useParams();
    useEffect(() => {
        getUserById(id);
        return () => dispatch(sliceAction.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Paper sx={{ px: 2, pt: 4, width: "100%" }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Update Vessel Details </Typography>
                <LoadingCustomOverlay active={loading} >
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="fullName" label="Full Name" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="email" label="Email" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="phone" label="Phone" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="password" label="New Password" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="input2" name="confirmPassword" label="Confirm Password" isMandatory={true} />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Update Details"}</Button>
                        </Grid>
                    </Form>
                </LoadingCustomOverlay>
            </Paper>
        </Box>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    userDetails: selectUserDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(updateUser(data)),
    getUserById: (id) => dispatch(fetchUserById(id))
});

const UserDetailsForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.userDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "UserDetailsForm"
})(UserDetails);

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm);


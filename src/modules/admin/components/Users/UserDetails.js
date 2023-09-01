import React, { useEffect } from "react";
import { STATE_REDUCER_KEY } from "../../constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions as sliceActions } from "../../slice";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { Form, withFormik } from "formik";
import { FormController } from "../../../../common/components";
import { createStructuredSelector } from "reselect";
import { selectUserDetails } from "../../selectors";
import { fetchUserById, updateUser } from "../../actions";
import { useNavigate, useParams } from "react-router-dom";
import PasswordUpdate from "./PasswordUpdate";

const UserDetails = (props) => {
    const navigate = useNavigate();
    const { handleSubmit, getUserById, setFieldValue } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].userDetails.requestInProgress);
    const { id = 0 } = useParams();
    useEffect(() => {
        getUserById(id);
        setFieldValue("_id", id);
        return () => dispatch(sliceActions.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Paper sx={{ px: 3, pt: 4, width: "100%", bgcolor: "primary.light" }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> User Details </Typography>
                <Box sx={{ position: "relative" }}>
                    <IconButton sx={{ position: "absolute", top: "-65px", right: "10px", display: "flex", flexDirection: "column" }} onClick={() => navigate("../users")}>
                        <KeyboardBackspaceIcon sx={{ color: "secondary.main" }} />
                        <Typography sx={{ color: "secondary.main" }}>Go Back</Typography>
                    </IconButton>
                </Box>
                <LoadingCustomOverlay active={loading} >
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="fullName" label="Full Name" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="email" label="Email" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="phone" label="Phone" isMandatory={true} />
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: "flex", pb: 4, justifyContent: "center", alignItems: "center" }}>
                            <Button sx={{
                                bgcolor: "secondary.main",
                                "&.hover": {
                                    bgcolor: "secondary.dark"
                                },
                                fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" }
                            }} variant="contained" type="submit" onClick={handleSubmit}>{"Update Details"}</Button>
                        </Grid>
                    </Form>
                </LoadingCustomOverlay>
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ my: 2, display: "flex" }}>
                    <Grid item sm={12} md={6}>
                        <Paper sx={{ width: "100%", height: "200px" }}>

                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <PasswordUpdate id={id} />
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    userDetails: selectUserDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: (data) => {
        const { fullName, phone, _id } = data;
        dispatch(updateUser({ fullName, phone, _id }));
    },
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


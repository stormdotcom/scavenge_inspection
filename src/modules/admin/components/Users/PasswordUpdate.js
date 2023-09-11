import React from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Form, withFormik } from "formik";
import { createStructuredSelector } from "reselect";

import { STATE_REDUCER_KEY } from "../../constants";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { FormController } from "../../../../common/components";
import { selectUserDetails } from "../../selectors";
import { resetPassword } from "../../actions";
import { passwordChangeSchema } from "../../validate";


const PasswordUpdate = (props) => {
    const { handleSubmit, id, setFieldValue } = props;
    const loading = useSelector(state => state[STATE_REDUCER_KEY].passwordDetails.requestInProgress);
    useEffect(() => {
        setFieldValue("id", id);
    }, []);
    return <Paper sx={{ px: 3, pt: 4, width: "100%", pr: 3 }}>
        <Typography sx={{ color: "secondary.main", fontSize: { xs: "11px", md: "28px" }, fontWeight: 600, pb: 1 }}> Update Password </Typography>
        <LoadingCustomOverlay active={loading} >
            <Form>
                <Grid container rowSpacing={2} columnSpacing={4}>
                    <Grid item sm={12} md={12} lg={12} xl={12}>
                        <FormController control="input2" name="password" label="New Password" isMandatory={true} />
                    </Grid>
                    <Grid item sm={12} md={12} lg={12} xl={12}>
                        <FormController control="input2" name="confirmPassword" label="Confirm Password" isMandatory={true} />
                    </Grid>
                </Grid>
                <Grid sx={{ display: "flex", pb: 4, pt: 3, justifyContent: "center", alignItems: "center" }}>
                    <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Reset Password"}</Button>
                </Grid>
            </Form>
        </LoadingCustomOverlay>
    </Paper>;
};

const mapStateToProps = createStructuredSelector({
    userDetails: selectUserDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(resetPassword(data))
});

const PasswordUpdateForm = withFormik({
    enableReinitialize: false,
    validationSchema: passwordChangeSchema,
    mapPropsToValues: () => {
        return { password: "", confirmPassword: "", id: "" };
    },
    handleSubmit: (values, { props: { submit }, resetForm }) => {
        resetForm();
        submit(values);
    },
    displayName: "PasswordUpdateForm"
})(PasswordUpdate);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordUpdateForm);


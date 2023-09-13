// import { CircularProgress } from "@mui/material";
import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { Components, FormController } from "../../../common/components";
import { actions as commonSliceActions } from "../../common/slice";
import { actions as sliceActions } from "../slice";
import { signUpVesselSchema } from "../validate";
import { fetchAdminDropDown, fetchOrgList, signUpVesselUser } from "../actions";
import { STATE_REDUCER_KEY } from "../constants";

import { getOrgAdmin, getOrgList, getSignUpVessel } from "../selectors";
import { createStructuredSelector } from "reselect";
import { confirmDialog } from "../../../utils/notificationUtils";
import ContainedButton from "../../../common/components/custom/ContainedButton";

const { Grid } = Components;

function SignUpVessel(props) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, setFieldValue, orgAdmin = [], orgList = [], signUp: { requestInProgress = false } = {} } = props;
    const confirmed = useSelector(state => state[STATE_REDUCER_KEY].signUp.confirm);


    if (confirmed) {
        confirmDialog({
            title: "Account Created", showDenyButton: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/signin");
            }
        });
    }


    const handleManager = (v) => {
        setFieldValue("officerAdmin", []);
        dispatch(fetchAdminDropDown(v));

    };


    useEffect(() => {
        return () => dispatch(sliceActions.clearAll());
    }, [pathname]);

    useEffect(() => {
        dispatch(fetchOrgList());
        dispatch(commonSliceActions.setNavigator(navigate));
    }, []);
    return (
        <>
            <Form>
                <Grid container columnSpacing={3} rowSpacing={1} sx={{ overflowY: "scroll", height: { xs: "300px", sm: "300px", md: "330px", lg: "350px", xl: "600px" } }}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="select" name="company_name" label="Select Organization" isMandatory={true} options={orgList} onChangeFromController={handleManager} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="select" name="officerAdmin" label="Select Manager" isMandatory={true} options={orgAdmin} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="input" name="fullName" label="Name" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="input" name="vessel_name" label="Vessel Name" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="input" name="cylinder_numbers" label="No of Cylinders" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="input" name="email" label="Email Address" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="input" name="phone" label="Phone Number" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                        <FormController control="input" name="imo_number" label="IMO Number" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                        <FormController control="input" name="password" label="Password" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                        <FormController control="input" name="confirmPassword" label="Confirm Password" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ContainedButton loader={requestInProgress} variant="contained" type="submit" onClick={handleSubmit}>{"Sign Up"}</ContainedButton>
                    </Grid>
                </Grid>
            </Form>
        </>

    );
}

const mapStateToProps = createStructuredSelector({
    signUpVessel: getSignUpVessel,
    orgAdmin: getOrgAdmin,
    orgList: getOrgList
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(signUpVesselUser(data))
});

const VesselRegistrationForm = withFormik({
    enableReinitialize: false,
    validationSchema: signUpVesselSchema,
    mapPropsToValues: (props) => props.signUpVessel.data,
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselSignUp"
})(SignUpVessel);

export default connect(mapStateToProps, mapDispatchToProps)(VesselRegistrationForm);

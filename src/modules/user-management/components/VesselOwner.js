// import { CircularProgress } from "@mui/material";
import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { Components, FormController } from "../../../common/components";
import { actions as commonSliceActions } from "../../common/slice";
import { actions as sliceActions } from "../slice";
import { signUpOwnerSchema } from "../validate";
import { fetchOrgAdmins, fetchOrgList, signUpVesselOwner } from "../actions";
import { STATE_REDUCER_KEY } from "../constants";
import { getOrgAdmin, getOrgList, getSignUpManager } from "../selectors";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import { confirmDialog } from "../../../utils/notificationUtils";
import ContainedButton from "../../../common/components/custom/ContainedButton";
import { Icons } from "../../../common/components";
const { Grid } = Components;
const { Info } = Icons;
function SignUpVesselOwner(props) {
    const [orgEmail, setOrgEmail] = useState();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, setFieldValue, orgList = [], signUp: { requestInProgress = false } = {},
        values: { isNewOrg = "" } = {} } = props;
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

    // eslint-disable-next-line no-unused-vars
    const handleOnChange = (value) => {
        let string = value.trim();
        if (string) {
            setOrgEmail(string);
        }
    };

    const radioOptions = [{ id: "existingOrg", name: "Existing Organization" }, { id: "newOrg", name: "New Organization" }];
    // eslint-disable-next-line no-unused-vars
    const handleOrgAdmin = () => {
        if (orgEmail && orgEmail !== "") {
            setFieldValue("organizationAdmin", "");
            dispatch(fetchOrgAdmins(orgEmail));
            setOrgEmail("");
        }
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
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="radio" name="isNewOrg" options={radioOptions} />
                    </Grid>
                    {isNewOrg === "newOrg" ?
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="input" name="company_name" label="Organization Name" isMandatory={true} />
                        </Grid> :
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                            <FormController control="select" name="company_name" label="Select Organization" isMandatory={true} options={orgList} />
                        </Grid>}

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController control="input" name="fullName" label="Name" isMandatory={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController
                            control="input" name="email" label="Email Address" isMandatory={true} icon={<Info fontSize="small" sx={{ color: "white.main" }} />} toolTipTitle={"Your Organization Email"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                        <FormController
                            control="input" name="phone" label="Phone Number" isMandatory={true} />
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
    signUpManager: getSignUpManager,
    orgAdmin: getOrgAdmin,
    orgList: getOrgList
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => {
        dispatch(signUpVesselOwner(data));
    }
});

const VesselOwnerRegistrationForm = withFormik({
    enableReinitialize: true,
    validationSchema: signUpOwnerSchema,
    mapPropsToValues: (props) => props.signUpManager.data,
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselOwnerSignUp"
})(SignUpVesselOwner);

export default connect(mapStateToProps, mapDispatchToProps)(VesselOwnerRegistrationForm);

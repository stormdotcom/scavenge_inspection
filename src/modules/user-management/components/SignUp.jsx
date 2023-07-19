// import { CircularProgress } from "@mui/material";
import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { Components, FormController } from "../../../common/components";
import { actions as commonSliceActions } from "../../common/slice";
import { actions as sliceActions } from "../slice";
import { signUpSchema as validator } from "../validate";
import { fetchOrgAdmins, fetchOrgList, signUp } from "../actions";
import { STATE_REDUCER_KEY, USER_TYPE } from "../constants";
import { Box, CircularProgress, Paper } from "@mui/material";
import { getOrgAdmin, getOrgList, getSignUp } from "../selectors";
import { createStructuredSelector } from "reselect";
import { AiOutlineFileSearch } from "react-icons/ai";
import Header from "../../common/header/Header";
import { useState } from "react";
import { confirmDialog } from "../../../utils/notificationUtils";

const { Divider, Grid, Typography } = Components;
const { Button } = Components;
function SignUp(props) {
    const [orgEmail, setOrgEmail] = useState();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, setFieldValue, orgAdmin = [], orgList = [], signUp: { requestInProgress = false } = {},
        values: { newOrg = true } = {} } = props;
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

    const handleOnChange = (value) => {
        let string = value.trim();
        if (string) {
            setOrgEmail(string);
        }
    };

    const handleOrgAdmin = () => {
        if (orgEmail && orgEmail !== "") {
            dispatch(fetchOrgAdmins(orgEmail));
            setOrgEmail("");
        }
    };

    useEffect(() => {
        setFieldValue("userType", USER_TYPE.VESSEL);
        return () => dispatch(sliceActions.clearAll());
    }, [pathname]);

    useEffect(() => {
        dispatch(fetchOrgList());
        dispatch(commonSliceActions.setNavigator(navigate));
    }, []);
    return (
        <>
            <Header />
            <Grid height="100vh" container sx={{ overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center" }}>
                <Box sx={{ mt: 1, width: "100%", display: "flex", alignItems: "center", mb: { lg: "130px", xl: "140px", justifyContent: "center" } }}>
                    <Paper sx={{ overflowY: "scroll", height: "500px", bgcolor: "primary.light", boxShadow: 0, width: { xs: "90%", sm: "90%", md: "520px", lg: "680px", xl: "680px" } }}>
                        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                            <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                                <Typography sx={{ fontSize: { xs: "20px", md: "26px", lg: "30px", xl: "35px", textAlign: "center" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >ScavAI Vision</Typography>
                                <Divider sx={{ color: "primary.light" }} />
                                <Box >
                                    <Form>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                            <FormController control="toggleButton" name="newOrg" label="New Organization" />
                                        </Grid>
                                        {newOrg ?
                                            <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController control="input" name="company_name" label="Company Name" isMandatory={true} />
                                            </Grid> :
                                            <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController control="select" name="company_name" label="Company Name" isMandatory={true} options={orgList} />
                                            </Grid>}

                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                            <FormController control="input" name="fullName" label="Full Name" isMandatory={true} />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                            <FormController control="input" name="vessel_name" label="Vessel Name" isMandatory={true} />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                            <FormController
                                                onClick={handleOrgAdmin}
                                                onChangeFromController={handleOnChange}
                                                toolTipTitle="Search Admin"
                                                icon={<AiOutlineFileSearch style={{ color: "#fff" }} />}
                                                control="input" name="email" label="Organization Email" isMandatory={true} />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="imo_number" label="IMO Number" isMandatory={true} />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="select" name="organizationAdmin" label="Please choose the organization administrator for your vessel" options={orgAdmin}
                                                info="If you are the administrator, please ignore this field. If an administrator already exists, please choose one using the Organization Email field to search for an administrator within your organization" />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="password" label="Password" isMandatory={true} />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="confirmPassword" label="Confirm Password" isMandatory={true} />
                                        </Grid>
                                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Sign Up"}</Button>
                                        </Grid>
                                        <Box sx={{ display: "flex", position: "relative" }}>
                                            <Box sx={{ position: "absolute", top: "-35px", right: "20px" }}>
                                                {requestInProgress && <CircularProgress size={25} sx={{
                                                    color: "secondary.main"
                                                }} />}
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", py: { xs: 3, xl: 4.5 }, justifyContent: "center", alignItems: "space-around", boxShadow: 0 }} elevation={0}>
                                            <Typography display="inline" sx={{ fontSize: { lg: "16px", xl: "18px" }, pt: 0.6, color: "white.main" }}>{"Already have account?"}</Typography>
                                            <Typography display="inline" variant="text" sx={{ fontWeight: 600, fontSize: { lg: "16px", xl: "18px" }, p: 0.5, m: 0, ml: 1, cursor: "pointer", "&:hover": { color: "#e8af13" } }} color="#e8af13"
                                                onClick={() => {
                                                    navigate("../signin");
                                                }
                                                }>{"Sign-In"}</Typography>
                                        </Box>
                                    </Form>
                                </Box>
                            </Box>
                        </Grid>
                    </Paper >
                </Box>
            </Grid >
        </>

    );
}

const mapStateToProps = createStructuredSelector({
    signUp: getSignUp,
    orgAdmin: getOrgAdmin,
    orgList: getOrgList
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(signUp(data))
});

const UserRegistrationForm = withFormik({
    enableReinitialize: false,
    validationSchema: validator,
    mapPropsToValues: (props) => props.signUp.data,
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "UserSignUp"
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationForm);

// import { CircularProgress } from "@mui/material";
import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { Components, FormController } from "../../../common/components";
import { actions as commonSliceActions } from "../../common/slice";
import { actions as sliceActions } from "../slice";
import { signUpSchema as validator } from "../validate";
import { fetchAdminDropDown, fetchOrgAdmins, fetchOrgList, signUp } from "../actions";
import { STATE_REDUCER_KEY, USER_TYPE } from "../constants";
import { Box, CircularProgress, Paper } from "@mui/material";
import { getOrgAdmin, getOrgList, getSignUp } from "../selectors";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import { STATE_REDUCER_KEY as COMMON } from "../../common";
import { confirmDialog } from "../../../utils/notificationUtils";
import logoImg from "../../../assets/images/logoDark.png";
import backgroundImage from "../../../assets/images/vesselBg.jpg";
import TermsAndCondition from "../../common/TermsAndCondition/TermsAndCondition";

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
    const homePath = useSelector(state => state[COMMON].homePath);

    if (confirmed) {
        confirmDialog({
            title: "Account Created", showDenyButton: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/signin");
            }
        });
    }
    const handleTC = () => dispatch(commonSliceActions.toggleShowHideTC(true));
    const handleCloseTC = () => dispatch(commonSliceActions.toggleShowHideTC(false));
    const tcOpen = useSelector(state => state[COMMON].tcOpen);
    // eslint-disable-next-line no-unused-vars
    const handleOnChange = (value) => {
        let string = value.trim();
        if (string) {
            setOrgEmail(string);
        }
    };
    const handleManager = (v) => {
        setFieldValue("organizationAdmin", []);
        dispatch(fetchAdminDropDown(v));

    };

    // eslint-disable-next-line no-unused-vars
    const handleOrgAdmin = () => {
        if (orgEmail && orgEmail !== "") {
            setFieldValue("organizationAdmin", "");
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
            <Box sx={{ width: "240px", position: "relative" }}>
                <Box sx={{ display: "flex", position: "absolute", top: "5px", left: "10px" }}>
                    <img
                        onClick={() => navigate(`../${homePath}`)}
                        style={{ cursor: "pointer" }}
                        alt="logo_scavenge"
                        src={logoImg}
                        width={60}
                        height={60}
                    />
                </Box>
            </Box>

            <Grid height="100vh" container sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center"
            }}>
                <Box sx={{ mt: 3, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", mb: { lg: "130px", xl: "140px" } }}>
                    <Paper sx={{ borderRadius: "20px", px: 1, border: "1px solid #AD7E14", boxShadow: 0, height: "90vh", width: { xs: "80%", sm: "70%", md: "560px", lg: "700px", xl: "700px" } }}>
                        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                            <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                                <Typography sx={{ fontSize: { xs: "20px", md: "26px", lg: "30px", xl: "35px", textAlign: "center" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >Scav AI Vision</Typography>
                                <Divider sx={{ color: "primary.light" }} />
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Form>
                                        <Grid container columnSpacing={3} rowSpacing={1} sx={{ overflowY: "scroll", height: { xs: "300px", sm: "300px", md: "400px", lg: "390px", xl: "600px" } }}>
                                            <Grid item xs={12} sm={6} md={12} lg={12} xl={12} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController control="toggleButton" name="newOrg" label="New Organization" />
                                            </Grid>
                                            {newOrg ?
                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                    <FormController control="input" name="company_name" label="Organization Name" isMandatory={true} />
                                                </Grid> :
                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                    <FormController control="select" name="company_name" label="Organization Name" isMandatory={true} options={orgList} onChangeFromController={handleManager} />
                                                </Grid>}

                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController control="input" name="fullName" label="Full Name" isMandatory={true} />
                                            </Grid>
                                            {!newOrg && <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController control="input" name="vessel_name" label="Vessel Name" />
                                            </Grid>}
                                            {!newOrg && <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController control="input" name="cylinder_numbers" label="No of Cylinders" />
                                            </Grid>}
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                                <FormController
                                                    // onClick={handleOrgAdmin}
                                                    // onChangeFromController={handleOnChange}
                                                    // toolTipTitle="Search Your Manager"
                                                    // icon={<AiOutlineFileSearch style={{ color: "#fff" }} />}
                                                    control="input" name="email" label="Organization Email" isMandatory={true} />
                                            </Grid>
                                            {!newOrg && <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                                <FormController control="input" name="imo_number" label="IMO Number" />
                                            </Grid>}
                                            {!newOrg && <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                                <FormController control="select" name="organizationAdmin" label="Select Manager" options={orgAdmin || []} />
                                            </Grid>}
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                                <FormController control="input" name="password" label="Password" isMandatory={true} />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                                <FormController control="input" name="confirmPassword" label="Confirm Password" isMandatory={true} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Sign Up"}</Button>
                                            </Grid>
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
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "white.main" }}>Your sign-up confirms your acceptance of our {" "}
                                                <span onClick={handleTC} style={{ cursor: "pointer", textDecoration: "underline" }}>
                                                    Terms and Conditions.</span> Welcome aboard!</Typography>
                                        </Box>
                                    </Form>
                                </Box>
                            </Box>
                        </Grid>
                    </Paper >
                </Box>
                <TermsAndCondition handleClose={handleCloseTC} open={tcOpen} />
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

// import { CircularProgress } from "@mui/material";
import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { Components, FormController } from "../../../common/components";

import { actions as sliceActions } from "../slice";
import { signUpSchema as validator } from "../validate";
import { signUp } from "../actions";
import { USER_TYPE } from "../constants";
import { Box, Paper } from "@mui/material";
import { getSignUp } from "../selectors";
import { createStructuredSelector } from "reselect";
import Header from "../../common/header/Header";

const { Divider, Grid, Typography } = Components;


const { Button } = Components;
const orgAdmin = [{ id: 1, name: "Test Admin" }, { id: 2, name: "Test Admin 2" }, { id: 3, name: "Test Admin 3" }];
function SignUp(props) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, setFieldValue } = props;
    // setFieldValue("userType", USER_TYPE.VESSEL);
    // const confirmed = useSelector(state => state[REDUCER_KEY].signUpForm.confirm);

    // if (confirmed) {
    //     confirmDialog({
    //         title: I18n("account_created"), showDenyButton: false
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             navigate("/login");
    //             window.sessionStorage.setItem("stepper", 0);
    //         }
    //     });
    // }

    useEffect(() => {
        setFieldValue("userType", USER_TYPE.VESSEL);
        return () => dispatch(sliceActions.clear());
    }, [pathname]);
    return (
        <>
            <Grid height="100vh" container sx={{ overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center" }}>
                <Header />
                <Box sx={{ mt: 1, width: "100%", display: "flex", alignItems: "center", mb: { lg: "130px", xl: "140px", justifyContent: "center" } }}>
                    <Paper sx={{ overflowY: "scroll", height: "500px", bgcolor: "primary.light", boxShadow: 0, mr: { xs: "40px", lg: "95px" }, width: { xs: "100%", md: "420px", lg: "480px", xl: "560px" } }}>
                        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                            <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                                <Typography sx={{ fontSize: { xs: "20px", md: "26px", lg: "30px", xl: "35px", textAlign: "center" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >ScavAI Vision</Typography>
                                <Divider sx={{ color: "primary.light" }} />
                                <Box >
                                    <Form>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                            <FormController control="input" name="email" label="Email" />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="imoNumber" label="IMO Number" />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="select" name="organisationAdmin" label="Choose one Organisation Admin for your Vessel?" options={orgAdmin} />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="password" label="Password" />
                                        </Grid>
                                        <Grid sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="confirmPassword" label="Confirm Password" />
                                        </Grid>
                                        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Sign Up"}</Button>
                                        </Grid>
                                        <Box sx={{ display: "flex", py: { xs: 3, xl: 4.5 }, justifyContent: "center", alignItems: "space-around", boxShadow: 0 }} elevation={0}>
                                            <Typography display="inline" sx={{ fontSize: { lg: "16px", xl: "18px" }, pb: 1.2, color: "white.main" }}>{"Already have account?"}</Typography>
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
    signUp: getSignUp
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(signUp(data))
});

const UserRegistrationForm = withFormik({
    enableReinitialize: false,
    validationSchema: validator,
    mapPropsToValues: () => ({ email: "", password: "", confirmPassword: "", imoNumber: "", organisationAdmin: "" }),
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "UserSignUp"
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationForm);

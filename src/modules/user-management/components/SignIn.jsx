import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";

import { Components, FormController } from "../../../common/components";
import { actions as commonSliceActions } from "../../common/slice";
import { actions as sliceActions } from "../slice";
import { signInSchema as validator } from "../validate";
import { signIn } from "../actions";
import { Box, Paper } from "@mui/material";
import { createStructuredSelector } from "reselect";
import { getSignIn } from "../selectors";
import { STATE_REDUCER_KEY as COMMON } from "../../common";
import backgroundImage from "../../../assets/images/vesselBg.jpg";
import ContainedButton from "../../../common/components/custom/ContainedButton";
import { HomeIcon } from "./HomeIcon";

const { Divider, Grid, Typography } = Components;

function SignIn(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, signIn: { requestInProgress = true } = {} } = props;
    const homePath = useSelector(state => state[COMMON].homePath);
    useEffect(() => {
        dispatch(commonSliceActions.setNavigator(navigate));
        return () => dispatch(sliceActions.clear());
    }, []);
    const handleClick = () => navigate(`../${homePath}`);
    const handleTC = () => dispatch(commonSliceActions.toggleShowHideTC(true));
    return (
        <>
            <Box sx={{ width: "240px", position: "relative" }}>
                <HomeIcon handleClick={handleClick} />
            </Box>
            <Grid height="100vh" container sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center"
            }}>
                <Box sx={{ mt: 3, width: "100%", display: "flex", alignItems: "center", mb: { lg: "130px", xl: "140px" }, justifyContent: "center", flexDirection: "column" }}>
                    <Paper sx={{ mt: { sm: 3, md: 6 }, pd: { sm: 2, md: 3 }, boxShadow: 0, width: { xs: "300px", sm: "360px", md: "420px", lg: "420px", xl: "520px" }, borderRadius: "20px", border: "1px solid #AD7E14" }} >
                        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                            <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                                <Typography sx={{ fontSize: { xs: "20px", md: "26px", lg: "30px", xl: "35px", textAlign: "center" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >Scav AI Vision</Typography>
                                <Divider sx={{ color: "primary.light" }} />
                                <Box >
                                    <Form>
                                        <Grid item sx={{ my: 1, py: { md: 1, xl: 1.5 } }}>
                                            <FormController control="input" name="email" label="Email" />
                                        </Grid>
                                        <Grid item sx={{ my: 1, py: { md: 1, xl: 1.5 }, pb: { md: 2, xl: 3 } }}>
                                            <FormController control="input" name="password" label="Password" type={"password"} />
                                        </Grid>
                                        <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <ContainedButton loader={requestInProgress} type="submit" onClick={handleSubmit}>{"Sign In"}</ContainedButton>
                                        </Grid>
                                        <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            {/* <Typography
                                                variant="text"
                                                sx={{ mb: 0, p: 0.5, fontSize: { lg: "16px", xl: "18px" }, color: "secondary.main", cursor: "pointer", "&:hover": { color: "secondary.dark" } }}
                                            >
                                                {"Forgot password?"}

                                            </Typography> */}
                                        </Grid>
                                        <Box sx={{ display: "flex", py: { xs: 3, xl: 4.5 }, justifyContent: "center", alignItems: "space-around", boxShadow: 0 }} elevation={0}>
                                            <Typography display="inline" sx={{ fontSize: { lg: "16px", xl: "18px" }, pt: 0.6, color: "white.main" }}>{"Don't have account?"}</Typography>
                                            <Typography display="inline" variant="text" sx={{ fontWeight: 600, fontSize: { lg: "16px", xl: "18px" }, p: 0.5, ml: 1, cursor: "pointer", "&:hover": { color: "#e8af13" } }} color="#e8af13"
                                                onClick={() => {
                                                    navigate("../signup");
                                                }
                                                }>{"Create Account"}</Typography>
                                        </Box>
                                    </Form>
                                </Box>
                            </Box>
                        </Grid>
                    </Paper >
                    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Box sx={{ textAlign: "center", mx: 0.3 }}>
                            <Typography sx={{ color: "white.main", fontSize: { xs: "9px", md: "10px", lg: "11px", xl: "12px" } }}> {" "}
                                <span onClick={() => navigate("../docs/home")} style={{ cursor: "pointer", textDecoration: "underline" }}>
                                    Read Documentation.</span></Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", mx: 0.3 }}>
                            <Typography sx={{ color: "white.main", fontSize: { xs: "9px", md: "10px", lg: "11px", xl: "12px" } }}>{" "}
                                <span onClick={handleTC} style={{ cursor: "pointer", textDecoration: "underline" }}>
                                    Read Terms and Conditions.</span> </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid ></>

    );
}

const mapStateToProps = createStructuredSelector({
    signIn: getSignIn
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => dispatch(signIn(data))
});

const UserRegistrationForm = withFormik({
    enableReinitialize: false,
    validationSchema: validator,
    mapPropsToValues: (props) => {
        return props.signIn.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "UserSignIn"
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationForm);

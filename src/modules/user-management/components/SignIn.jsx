import { withFormik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";

import { Components, FormController } from "../../../common/components";
import { actions as commonSliceActions } from "../../common/slice";
import { actions as sliceActions } from "../slice";
import { signInSchema as validator } from "../validate";
import { signIn } from "../actions";
import { Box, CircularProgress, Paper } from "@mui/material";
import { createStructuredSelector } from "reselect";
import { getSignIn } from "../selectors";
import { STATE_REDUCER_KEY as COMMON } from "../../common";
import logoImg from "../../../assets/images/logoDark.png";
import backgroundImage from "../../../assets/images/vesselBg.jpg";

const { Divider, Grid, Typography } = Components;

const { Button } = Components;

function SignIn(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, signIn: { requestInProgress = true } = {} } = props;
    const homePath = useSelector(state => state[COMMON].homePath);
    useEffect(() => {
        dispatch(commonSliceActions.setNavigator(navigate));
        return () => dispatch(sliceActions.clear());
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
                <Box sx={{ mt: 3, width: "100%", display: "flex", alignItems: "center", mb: { lg: "130px", xl: "140px", justifyContent: "center" } }}>
                    <Paper sx={{ mt: { sm: 3, md: 6 }, boxShadow: 0, width: { xs: "300px", sm: "360px", md: "420px", lg: "420px", xl: "520px" }, borderRadius: "20px", border: "1px solid #AD7E14" }} >
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
                                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Sign In"}</Button>
                                        </Grid>
                                        <Box sx={{ display: "flex", position: "relative" }}>
                                            <Box sx={{ position: "absolute", top: "-35px", right: "20px" }}>
                                                {requestInProgress && <CircularProgress size={25} sx={{
                                                    color: "secondary.main"
                                                }} />}
                                            </Box>
                                        </Box>
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

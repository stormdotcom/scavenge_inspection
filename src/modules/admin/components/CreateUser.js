import { Form, withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchUserById } from "../actions";
import { getUserDetails } from "../selectors";

import { actions as sliceActions } from "../slice";
import { STATE_REDUCER_KEY } from "../constants";
import { Components, FormController } from "../../../common/components";
import LoadingCustomOverlay from "../../common/components/LoadingOverlay";
const { Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography, Button } = Components;


const CreateUser = (props) => {
    const dispatch = useDispatch();
    const { id = 0 } = useParams();
    const { setFieldValue, handleSubmit } = props;
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY]).lookUpCategoryTypeDetails.requestInProgress;

    useEffect(() => {
        if (id) {
            setFieldValue("id", id);
            dispatch(fetchUserById(id));
        }
        return () => dispatch(sliceActions.clearAll());
    }, []);
    return (
        <Card sx={{ m: 2, overflow: "visible" }} >
            <LoadingCustomOverlay active={requestInProgress}>
                <Form onSubmit={handleSubmit}>
                    <CardHeader title={"User Details"} component={Typography} />
                    <Divider />
                    <CardContent sx={{ ml: 2, mr: 2 }}>
                        <Grid container spacing={2} sx={{ mb: 3 }} >
                            <Grid item xs={12} md={6} lg={6} >
                                <FormController control="input" label={"name"} name="name" isMandatory={true} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} >
                                <FormController control="input" label={"description"} name="email" isMandatory={true} />
                            </Grid>

                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Grid sx={{ mb: 2 }} container justifyContent="center">
                            <Button type="submit"> {id ? "update" : "save"}</Button>
                        </Grid>
                    </CardActions>
                </Form >
            </LoadingCustomOverlay>
        </Card >

        // <Grid sx={{ mb: 2 }} >
        //     <Card sx={{ m: 2, overflow: "visible" }} >
        //         <Form onSubmit={handleSubmit} >
        //             <CardHeader title="Sign In" component={Typography} />
        //             <Divider />
        //             <CardContent sx={{ ml: 2, mr: 2 }}>
        //                 <Grid container spacing={2}>
        //                     <Grid item xs={12} md={6} lg={4}>
        //                         <FormController
        //                             control="input"
        //                             label={"Email"}
        //                             name="email"
        //                             inputProps={{ style: { textTransform: "lowercase" } }} />
        //                     </Grid>
        //                     <Grid item xs={12} md={6} lg={4}>
        //                         <FormController control="input" label={"Password"} name="password" type="password" />
        //                     </Grid>
        //                 </Grid>
        //             </CardContent>
        //             <Divider />
        //             <CardActions>
        //                 <Grid container justifyContent="center">
        //                     <Button type="submit" >Sign In</Button>
        //                 </Grid>
        //             </CardActions>
        //         </Form >
        //         <Grid>
        //         </Grid>
        //     </Card >
        //     <Paper sx={{ position: "absolute", right: "-3px", bottom: "-3px", width: { md: "60%", lg: "55%", xl: "45%" }, height: "13vh", alignItems: "center", justifyContent: "end", display: { xs: "none", md: "flex" }, borderRadius: "20px" }} elevation={0} >
        //         <Grid sx={{ display: "flex" }}>
        //             <Typography sx={infoList}> Version </Typography>
        //             <Typography sx={infoList}>Terms and Conditions</Typography>
        //             <Typography sx={infoList}>Privacy Policy</Typography>
        //             <Typography sx={{ pl: "10px", fontSize: "16px" }}> Copyright </Typography>
        //         </Grid>
        //         <Paper sx={{
        //             position: "absolute", bottom: "-4px", left: "-28px", bgcolor: "#fff", width: "50px", height: "50px", background: "radial-gradient(97% 125% at left, transparent 50%, #fff 51%)", transform: "rotate(27deg)"
        //         }} elevation={0}>
        //         </Paper>
        //         <Paper sx={{
        //             position: "absolute", top: "-30px", right: "-6px", bgcolor: "#fff", width: "50px", height: "50px", background: "radial-gradient(97% 125% at right, transparent 50%, #fff 51%)", transform: "rotate(238deg)"
        //         }} elevation={0}>
        //         </Paper>
        //     </Paper>
        // </Grid >
    );
};


const mapStateToProps = createStructuredSelector({
    userDetails: getUserDetails
});

const mapDispatchToProps = () => ({
    // submitValues: (data) => dispatch(submitCategoryTypeValues(data))
});

const user = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.userDetails.data;
    },
    // validationSchema: lookUpCategoryTypeSchema,
    handleSubmit: (values, { props }) => {
        props.submitValues(values);
    },
    displayName: "CreateUser"
})(CreateUser);

export default connect(mapStateToProps, mapDispatchToProps)(user);

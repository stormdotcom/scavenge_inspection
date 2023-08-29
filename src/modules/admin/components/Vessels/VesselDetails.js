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
import { selectVesselDetails } from "../../selectors";
import { fetchUserById, updateUser } from "../../actions";
import { useNavigate, useParams } from "react-router-dom";

const VesselDetailsView = (props) => {
    const navigate = useNavigate();
    const { handleSubmit, getUserById } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].vesselDetails.requestInProgress);
    const { id = 0 } = useParams();
    useEffect(() => {
        getUserById(id);
        return () => dispatch(sliceActions.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Paper sx={{ px: 3, pt: 4, width: "100%", bgcolor: "primary.light" }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", fontWeight: 600, pb: 1 }}> Vessel Details </Typography>
                <Box sx={{ position: "relative" }}>
                    <IconButton sx={{ position: "absolute", top: "-65px", right: "10px", display: "flex", flexDirection: "column" }} onClick={() => navigate("../vessels")}>
                        <KeyboardBackspaceIcon sx={{ color: "secondary.main" }} />
                        <Typography sx={{ color: "secondary.main" }}>Go Back</Typography>
                    </IconButton>
                </Box>
                <LoadingCustomOverlay active={loading} >
                    <Form>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="vessel_name" label="Vessel Name" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="imo_number" label="IMO Number" isMandatory={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="type_of_engine" label="Type of engine" isMandatory={true} />
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
            </Paper>
        </Box>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    vesselDetails: selectVesselDetails
});

const mapDispatchToProps = (dispatch) => ({
    submit: data => {
        dispatch(updateUser(data));
    },
    getUserById: (id) => dispatch(fetchUserById(id))
});

const VesselDetailsViewForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.vesselDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselDetailsViewForm"
})(VesselDetailsView);

export default connect(mapStateToProps, mapDispatchToProps)(VesselDetailsViewForm);


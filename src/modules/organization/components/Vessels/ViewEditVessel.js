import React, { useEffect } from "react";
import { FormController } from "../../../../common/components";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { connect } from "react-redux";
import { Form, withFormik } from "formik";
import { createStructuredSelector } from "reselect";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { fetchVesselById } from "../../actions";
import { getVesselDetails } from "../../selectors";
import { useNavigate, useParams } from "react-router-dom";
import SquareStatsCad from "../../../admin/components/SquareStatsCad";

const ViewEditVessel = (props) => {
    const { vesselDetails: { requestInProgress = false, report = {} } = {}, getVessel } = props;
    const { cylinderImageCount = 0, reportCount = 0 } = report;
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getVessel(id);
    }, []);
    return <Grid sx={{ width: "100%", minHeight: "90vh", p: 4 }}>
        <Paper elevation={2} sx={{ mt: 2, pb: 3, bgcolor: "primary.600" }}>
            <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
                <Typography sx={{ color: "secondary.main", fontSize: "28px", mt: 3, fontWeight: 700, pb: 1 }}> Vessel Details </Typography>
                <Box sx={{ position: "relative" }}>
                    <IconButton sx={{ position: "absolute", top: "-65px", right: "10px", display: "flex", flexDirection: "column" }} onClick={() => navigate("../vessels")}>
                        <KeyboardBackspace sx={{ color: "secondary.main" }} />
                        <Typography sx={{ color: "secondary.main" }}>Go Back</Typography>
                    </IconButton>
                </Box>
                <Box sx={{ px: 2, pt: 4, width: "100%" }}>
                    <Form>
                        <LoadingCustomOverlay active={requestInProgress} >
                            <Grid container rowSpacing={1} columnSpacing={2}>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="vessel_name" label="Vessel Name" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="imo_number" label="IMO Number" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="manufacturer" label="Manufacturer" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="type_of_engine" label="Engine Type" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="vessel_type" label="Vessel Type" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="cylinder_numbers" label="No of Cylinder" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="email" label="Email" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={5} lg={6} xl={4}>
                                    <FormController control="view" name="phone" label="Phone" />
                                </Grid>
                                {/* <Grid item sm={12} md={6} lg={6} xl={4}>
                                <FormController control="view" name="cylinder_numbers" label="Cylinders Number" />
                            </Grid> */}
                            </Grid>
                            <Grid container rowSpacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <SquareStatsCad value={cylinderImageCount} type="Total Images Uploaded" cardType="dark" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SquareStatsCad value={reportCount} type="Total Report Generated" cardType="dark" />
                                </Grid>
                            </Grid>
                        </LoadingCustomOverlay >

                    </Form>
                </Box>
            </Box>
        </Paper>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    vesselDetails: getVesselDetails
});

const mapDispatchToProps = (dispatch) => ({
    getVessel: (id) => dispatch(fetchVesselById(id))
});

const vesselDetailsForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.vesselDetails.data;
    },
    displayName: "VesselDetailsForm"
})(ViewEditVessel);
export default connect(mapStateToProps, mapDispatchToProps)(vesselDetailsForm);



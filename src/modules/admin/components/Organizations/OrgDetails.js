import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { Form, withFormik } from "formik";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";

import { STATE_REDUCER_KEY } from "../../constants";
import { actions as sliceActions } from "../../slice";
import LoadingCustomOverlay from "../../../common/components/LoadingOverlay";
import { FormController } from "../../../../common/components";
import { selectOrgDetails } from "../../selectors";
import { fetchOrgById, updateOrg } from "../../actions";
import BackButton from "../../../../common/components/custom/BackButton";


const OrgDetails = (props) => {
    const { getOrgById, handleSubmit, setFieldValue } = props;
    const dispatch = useDispatch();
    const loading = useSelector(state => state[STATE_REDUCER_KEY].orgDetails.requestInProgress);
    const { id = 0 } = useParams();
    useEffect(() => {
        setFieldValue("_id", id);
        getOrgById(id);
        return () => dispatch(sliceActions.clearAll());
    }, []);

    return <Grid sx={{ width: "100%", minHeight: "90vh", bgcolor: "primary.main", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", px: 5, mb: 2 }}>
            <Paper sx={{ px: 3, pt: 4, width: "100%", bgcolor: "primary.light" }}>
                <Typography sx={{ color: "secondary.main", fontSize: { xs: "11px", md: "28px" }, fontWeight: 600, pb: 1 }}> Organization Details </Typography>
                <BackButton path="../organizations" />

                <Form>
                    <LoadingCustomOverlay active={loading}>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="company_name" label="Organization Name" />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="code" label="Organization Code" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="domain" label="Domain" disabled={true} />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6} xl={4}>
                                <FormController control="input2" name="manager.fullName" label="Organization Manager" disabled={true} />
                            </Grid>
                        </Grid>
                    </LoadingCustomOverlay>
                    <Grid sx={{ display: "flex", pb: 4, justifyContent: "center", alignItems: "center" }}>
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
            </Paper>
        </Box>
    </Grid >;
};

const mapStateToProps = createStructuredSelector({
    orgDetails: selectOrgDetails
});

const mapDispatchToProps = (dispatch) => ({
    getOrgById: (id) => dispatch(fetchOrgById(id)),
    submit: (data) => {
        const { company_name, _id } = data;
        dispatch(updateOrg({ company_name, _id }));
    }
});

const OrgDetailsForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return props.orgDetails.data;
    },
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "OrgDetailsForm"
})(OrgDetails);

export default connect(mapStateToProps, mapDispatchToProps)(OrgDetailsForm);


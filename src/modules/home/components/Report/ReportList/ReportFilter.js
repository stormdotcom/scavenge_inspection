import { withFormik, Form } from "formik";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { actions as sliceActions } from "../../../slice";
import { Box, Paper } from "@mui/material";
import { createStructuredSelector } from "reselect";
import { Components, FormController } from "../../../../../common/components";
import { searchReport } from "../../../actions";
import { getExtraProps } from "../../../selectors";
const { Grid, Button } = Components;

function ReportFilter(props) {
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    useEffect(() => {
        return () => dispatch(sliceActions.clear());
    }, []);

    return (
        <Box sx={{ mt: 2, width: "100%", display: "flex", alignItems: "center", px: 2.5 }}>
            <Paper sx={{ bgcolor: "primary.dark", boxShadow: 0, width: "100%", borderRadius: "25px", py: 3 }} >
                <Form>
                    <Grid container sx={{ display: "flex", justifyContent: "space-around" }} >
                        <Grid item sm={12} md={6} lg={4} xl={3} sx={{ my: 1 }}>
                            <FormController control="date3" name="startDate" label="Start Date" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4} xl={3} sx={{ my: 1 }}>
                            <FormController control="date3" name="endDate" label="End Date" />
                        </Grid>
                        <Grid item sm={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button sx={{ bgcolor: "secondary.main", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } }} variant="contained" type="submit" onClick={handleSubmit}>{"Search"}</Button>
                        </Grid>
                    </Grid>
                </Form>
            </Paper >
        </Box>
    );
}

const mapStateToProps = createStructuredSelector({
    extraProps: getExtraProps
});

const mapDispatchToProps = (dispatch) => ({
    submit: (data) => dispatch(searchReport(data))
});

const ReportFilterForm = withFormik({
    enableReinitialize: false,
    mapPropsToValues: (props) => props.extraProps,
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "ReportFilterForm"
})(ReportFilter);

export default connect(mapStateToProps, mapDispatchToProps)(ReportFilterForm);

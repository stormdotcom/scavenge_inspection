import { withFormik, Form } from "formik";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { actions as sliceActions } from "../../../slice";
import { Box, Paper } from "@mui/material";
import { createStructuredSelector } from "reselect";
import { Components, FormController, Icons } from "../../../../../common/components";
import { searchReport } from "../../../actions";
import { getExtraProps } from "../../../selectors";
import { reportValidationSchema } from "../../../validate";
import ContainedButton from "../../../../../common/components/custom/ContainedButton";
const { Grid } = Components;
const { FilterAltRounded } = Icons;
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
                        <Grid item sm={12} md={5} lg={6} xl={3} sx={{ my: 1 }}>
                            <FormController control="date3" name="startDate" label="Start Date" />
                        </Grid>
                        <Grid item sm={12} md={5} lg={6} xl={3} sx={{ my: 1 }}>
                            <FormController control="date3" name="endDate" label="End Date" />
                        </Grid>
                        <Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ContainedButton icon={<FilterAltRounded />} type="submit" onClick={handleSubmit}>{"Filter"}</ContainedButton>
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
    validationSchema: reportValidationSchema,
    mapPropsToValues: (props) => props.extraProps,
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "ReportFilterForm"
})(ReportFilter);

export default connect(mapStateToProps, mapDispatchToProps)(ReportFilterForm);

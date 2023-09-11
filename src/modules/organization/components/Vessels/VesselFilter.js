import { withFormik, Form } from "formik";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import { actions as sliceActions } from "../../slice";
import { Box, Paper } from "@mui/material";
import { Components, FormController, Icons } from "../../../../common/components";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { filterVessel } from "../../actions";

const { Grid } = Components;
const { FilterAltRounded } = Icons;

function VesselFilter(props) {
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
                            <FormController control="input" name="vessel_name" label="Vessel Name" />
                        </Grid>
                        <Grid item sm={12} md={5} lg={6} xl={3} sx={{ my: 1 }}>
                            <FormController control="input" name="imo_number" label="IMO Number" />
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

const mapDispatchToProps = (dispatch) => ({
    submit: (data) => dispatch(filterVessel(data))
});

const VesselFilterForm = withFormik({
    enableReinitialize: false,
    mapPropsToValues: () => ({ vessel_name: "", imo_number: "" }),
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselFilterForm"
})(VesselFilter);

export default connect(null, mapDispatchToProps)(VesselFilterForm);

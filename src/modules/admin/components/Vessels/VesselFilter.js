import { useEffect } from "react";
import { withFormik, Form } from "formik";
import { connect, useDispatch } from "react-redux";
import { Box, Paper } from "@mui/material";
import { createStructuredSelector } from "reselect";

import { actions as sliceActions } from "../../slice";
import { Components, FormController } from "../../../../common/components";
import { getExtraProps } from "../../../vessel/selectors";
import { vesselFilterSearch } from "../../actions";
const { Grid, Button } = Components;

function VesselFilter(props) {
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    useEffect(() => {
        return () => dispatch(sliceActions.clear());
    }, []);

    return (
        <Box sx={{ mt: 2, width: "100%", display: "flex", alignItems: "center", px: 2.5 }}>
            <Paper sx={{ bgcolor: "primary.dark", boxShadow: 0, width: "100%", borderRadius: "25px", py: 3, px: 2 }} >
                <Form>
                    <Grid container columnSpacing={2} sx={{ display: "flex", justifyContent: "space-around" }} >
                        <Grid item sm={12} md={6} lg={4} xl={3} sx={{ my: 1 }}>
                            <FormController control="input" name="vessel_name" label="Vessel Name" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4} xl={3} sx={{ my: 1 }}>
                            <FormController control="input" name="imo_number" label="IMO Number" />
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
    submit: (data) => dispatch(vesselFilterSearch(data))
});

const VesselFilterForm = withFormik({
    enableReinitialize: false,
    mapPropsToValues: () => ({ imo_number: "", vessel_name: "" }),
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "VesselFilterForm"
})(VesselFilter);

export default connect(mapStateToProps, mapDispatchToProps)(VesselFilterForm);

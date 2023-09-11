import { useEffect } from "react";
import { withFormik, Form } from "formik";
import { connect, useDispatch } from "react-redux";
import { Box, Paper } from "@mui/material";
import { createStructuredSelector } from "reselect";
<<<<<<< HEAD

import { actions as sliceActions } from "../../slice";
import { Components, FormController } from "../../../../common/components";
=======
import { Components, FormController, Icons } from "../../../../common/components";
>>>>>>> 7b463438a4c2451f810d89b00e0cd7b16cc2d7c1
import { getExtraProps } from "../../../vessel/selectors";
import { orgFilterSearch } from "../../actions";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
const { Grid } = Components;
const { FilterAltRounded } = Icons;
function OrgFilter(props) {
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
                        <Grid item sm={12} md={6} lg={3} xl={3} sx={{ my: 1 }}>
                            <FormController control="input" name="company_name" label="Organization Name" />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3} xl={3} sx={{ my: 1 }}>
                            <FormController control="input" name="orgManager" label="Organization Manager" />
                        </Grid>
                        <Grid item sm={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ContainedButton icon={<FilterAltRounded />} type="submit" onClick={handleSubmit}>{"Filter"}</ContainedButton>                        </Grid>
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
    submit: (data) => dispatch(orgFilterSearch(data))
});

const OrgFilterForm = withFormik({
    enableReinitialize: false,
    mapPropsToValues: () => ({ company_name: "", orgManager: "" }),
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "OrgFilterForm"
})(OrgFilter);

export default connect(mapStateToProps, mapDispatchToProps)(OrgFilterForm);

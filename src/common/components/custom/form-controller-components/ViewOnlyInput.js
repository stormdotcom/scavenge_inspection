import { Grid, InputLabel, Typography } from "@mui/material";
import { Field } from "formik";

function Input(props) {
    const { label, name, sx = {}, isMandatory = false } = props;
    return (
        <Grid sx={{ py: 1, ...sx }}>
            <InputLabel sx={{ fontWeight: { xs: 400, md: 600 }, color: "#E9F4EA", fontSize: { xs: "11px", md: "14px" } }} htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "11px" }}> *</span>}</InputLabel>
            <Field name={name} >
                {({ form }) => {
                    return (
                        <>
                            <Typography sx={{ color: "#ffffff", fontSize: { xs: "11px", md: "14px" }, fontWeight: 600, pt: 2 }}>
                                {form.values[name]}
                            </Typography>
                        </>
                    );
                }}
            </Field>
        </Grid >
    );
}

export default Input;

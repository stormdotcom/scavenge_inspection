import { Grid, InputLabel, Typography } from "@mui/material";
import { Field } from "formik";

function Input(props) {
    const { label, name, sx = {}, isMandatory = false } = props;
    return (
        <Grid sx={{ py: 1, ...sx }}>
            <InputLabel sx={{ fontWeight: 400 }} htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "11px" }}> *</span>}</InputLabel>
            <Field name={name} >
                {({ form }) => {
                    return (
                        <>
                            <Typography sx={{ color: "#ffffff", fontWeight: 600, pt: 2 }}>
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

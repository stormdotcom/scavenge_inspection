import React from "react";
import { Field } from "formik";
import { Grid, Input, InputLabel } from "@mui/material";
import { FORM_CONTROL_STYLE_ALT } from "./style";

const SimpleDate = ({ label, name, isMandatory, ...rest }) => {
    return (
        <Grid container sx={{ ...FORM_CONTROL_STYLE_ALT }}>
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel sx={{ fontWeight: 700 }} htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "14px" }}> *</span>}</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ xs: { width: "100%" } }}>
                <Field name={name}>
                    {({ field, form }) => {
                        const { value } = field;
                        const { touched, errors, setFieldValue } = form;
                        // const isError = touched[name] && errors[name];

                        return (
                            <Input
                                sx={{ color: "white.main", bgcolor: "primary.dark", py: 2 }}
                                type="date"
                                id={name}
                                value={value}
                                onChange={(e) => setFieldValue(name, e.target.value)}
                                {...rest}
                            />
                        );
                    }}
                    {/* {isError && <div>{errors[name]}</div>} */}
                </Field>
            </Grid>

        </Grid>
    );
};

export default SimpleDate;



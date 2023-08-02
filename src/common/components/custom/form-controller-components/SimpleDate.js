import React, { useState } from "react";
import { Field } from "formik";
import { Grid, Input, InputLabel } from "@mui/material";
import { FORM_CONTROL_STYLE_ALT } from "./style";
import { fromDateObjectToEpoch, fromEpochToMuiDate, fromMuiDateEpoch } from "../../../../utils/dateUtils";

const SimpleDate = ({ label, name, isMandatory, ...rest }) => {
    const [err, setErr] = useState(null);
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
                        const isError = touched[name] && errors[name];
                        const now = new Date(); // Current date
                        const handleDateChange = (e) => {
                            const inputValue = fromMuiDateEpoch(e.target.value);
                            const currentDate = fromDateObjectToEpoch(now);
                            const isFutureDate = inputValue > currentDate;

                            if (!isFutureDate) {
                                setFieldValue(name, inputValue);
                                setErr(null);
                            } else {
                                setErr("Cannot set future Date");
                            }
                        };
                        const muiCompatibleDate = fromEpochToMuiDate(value);
                        return (
                            <>
                                <Input
                                    sx={{ color: "white.main", bgcolor: "primary.dark", py: 2 }}
                                    type="date"
                                    id={name}
                                    value={muiCompatibleDate}
                                    onChange={handleDateChange}
                                    {...rest}
                                />
                                {isError && <div>{errors[name]}</div>}
                                {err && <p style={{ color: "red", fontSize: "14px" }}> {err}</p>}
                            </>


                        );
                    }}

                </Field>
            </Grid>

        </Grid>
    );
};

export default SimpleDate;



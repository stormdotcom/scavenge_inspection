import React, { useState } from "react";
import { Field } from "formik";
import { Grid, Input, InputLabel } from "@mui/material";
import { FORM_CONTROL_STYLE_ALT } from "./style";
import { fromDateObjectToEpoch, fromEpochToMuiDate, fromMuiDateEpoch } from "../../../../utils/dateUtils";
import { styled } from "@mui/system";

const StyledInput = styled(Input)`
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1); // This will invert the icon color (e.g., white -> black)
    /* You can also set the color using 'color' property like so:
    color:;
    */
  }
`;

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
                                <StyledInput
                                    sx={{ color: "white.main", bgcolor: "#101010", py: 2, "$.hover": { bgcolor: "red" } }}
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



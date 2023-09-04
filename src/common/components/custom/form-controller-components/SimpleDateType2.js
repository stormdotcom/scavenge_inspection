import React from "react";
import { Field } from "formik";
import { Grid, Input, InputLabel } from "@mui/material";
import { FORM_CONTROL_DATE_STYLE } from "./style";
import { fromDateObjectToEpoch, fromEpochToMuiDate, fromMuiDateEpoch } from "../../../../utils/dateUtils";
import { useState } from "react";
import { styled } from "@mui/system";

const StyledInput = styled(Input)`
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1); // This will invert the icon color (e.g., white -> black)
    /* You can also set the color using 'color' property like so:
    color: your-desired-color;
    */
  }
`;

const SimpleDate = ({ label, name, isMandatory, sx = { justifyContent: "center", alignCenter: "center" }, ...rest }) => {
    const [err, setErr] = useState(null);
    return (
        <Grid sx={{ ...FORM_CONTROL_DATE_STYLE, ...sx }}>
            <Grid>
                <InputLabel sx={{ fontWeight: 600, fontSize: "12px" }} htmlFor={name}>
                    {label} {isMandatory && <span style={{ color: "red", fontSize: "14px" }}> *</span>}
                </InputLabel>
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
                                    sx={{ color: "white.main", bgcolor: "#101010", py: 2 }}
                                    type="date"
                                    id={name}
                                    value={muiCompatibleDate}
                                    onChange={handleDateChange}
                                    max={now.toISOString().split("T")[0]}
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

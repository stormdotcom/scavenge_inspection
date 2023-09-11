import { Box, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";

import { FORM_CONTROL_STYLE_ALT } from "./style";
import TextError from "./TextError";

function Input2(props) {
    const { label, name, icon, onClick, sx = {}, errorName = "", statusError = false, onChangeText, onChangeFromController, digitsOnly = false, isMandatory = false, upperCase = false, ...rest } = props;
    return (
        <Grid container sx={{ ...FORM_CONTROL_STYLE_ALT, ...sx }}>
            <Grid item xs={12} sm={6} md={6} sx={{ width: { xs: "140px", sm: "100%" } }}>
                <InputLabel sx={{ fontWeight: { xs: 400, md: 700 }, fontSize: { xs: "11px", md: "14px" } }} htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "11px" }}> *</span>}</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ width: { xs: "140px", sm: "100%" } }}>
                <Field name={name} sx={{ height: "20px" }}>
                    {({ form, field }) => {
                        const { handleChange } = form;
                        const customHandleChange = (e) => {
                            onChangeText && onChangeText(e.target.value);
                            const regex = /^[0-9\b]+$/;
                            if (!digitsOnly) {
                                handleChange(e);
                            }
                            if (digitsOnly && e.target.value === "" || regex.test(e.target.value.toLowerCase())) {
                                handleChange(e);
                            } else if (upperCase) {
                                e.target.value = e.target.value.toUpperCase();
                                handleChange(e);
                            }
                        };
                        onChangeFromController && onChangeFromController(form.values[name]);
                        return (
                            <>
                                <TextField
                                    id={name}
                                    {...field}
                                    {...rest}
                                    size="small"
                                    onChange={customHandleChange}
                                    autoComplete="new-password"
                                    sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: "#5A5A5A"
                                        },
                                        maxWidth: "400px"
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {icon && <IconButton onClick={onClick} edge="end"> {icon}</IconButton>}
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Box sx={{ display: "block", position: "relative" }}>
                                    {statusError ? <Typography variant="p" sx={{ color: "error.main", lineHeight: 0 }}>{errorName}</Typography> :
                                        <ErrorMessage component={TextError} name={name} />}
                                </Box>

                            </>
                        );
                    }}
                </Field>

            </Grid>
        </Grid >
    );
}

export default Input2;

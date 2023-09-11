import { createTheme, Grid, IconButton, InputAdornment, InputLabel, TextField, ThemeProvider, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";

const theme = createTheme({
});
const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderBottom: "2px solid grey"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderBottom: "2px solid #0784D6"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderBottom: "2px solid #0890e9"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderBottom: "2px solid #0784D6"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
        color: "black"
    },
    fontSize: "10px"
});
function Input3(props) {
    const { label, name, icon, onClick, sx = {}, errorName = "", statusError = false, onChangeText, onChangeFromController, digitsOnly = false, isMandatory = false, upperCase = false, ...rest } = props;

    const inputStyle = { color: "primary.main", width: { xs: "140px", sm: "100%" } };
    return (
        <Grid sx={{ ...FORM_CONTROL_STYLE, ...sx }}>
            <InputLabel sx={inputStyle} htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontWeight: { xs: 400, md: 700 }, fontSize: { xs: "11px", md: "14px" } }}> *</span>}</InputLabel>
            <Field name={name} >
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
                        <ThemeProvider theme={theme}>
                            <StyledTextField
                                id={name}
                                {...field}
                                {...rest}
                                size="small"
                                variant="standard"
                                onChange={customHandleChange}
                                autoComplete="new-password"
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#5A5A5A"
                                    },
                                    borderColor: "red"
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 12, height: "25px", fontWeight: 600,
                                        paddingRight: "10px",
                                        paddingLeft: "15px"

                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {icon && <IconButton onClick={onClick} edge="end"> {icon}</IconButton>}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {
                                statusError ? <Typography variant="p" sx={{ color: "red", mt: 1, lineHeight: 0, fontSize: { xs: "9px", sm: "10px", md: "11px", lg: "12px" } }}>{errorName}</Typography> :
                                    <ErrorMessage component={TextError} name={name} />
                            }
                        </ThemeProvider>
                    );
                }}
            </Field>
        </Grid >
    );
}

export default Input3;

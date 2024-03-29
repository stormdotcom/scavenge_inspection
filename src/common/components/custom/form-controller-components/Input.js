import { Grid, IconButton, InputAdornment, InputLabel, TextField, Tooltip, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";


import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";

function Input(props) {
  const { toolTipTitle = "", label, name, icon, onClick, sx = {}, errorName = "", statusError = false, onChangeText, onChangeFromController, digitsOnly = false, isMandatory = false, upperCase = false, ...rest } = props;
  //sx={{ fontWeight: { xs: 400, md: 700 }, fontSize: { xs: "11px", md: "14px" } }}
  return (
    <Grid sx={{ ...FORM_CONTROL_STYLE, ...sx }}>
      <InputLabel htmlFor={name} sx={{ fontWeight: { xs: 400, md: 700 }, fontSize: { xs: "11px", md: "14px" } }}>{label} {isMandatory && <span style={{ color: "red", fontWeight: { xs: 400, md: 700 }, fontSize: { xs: "11px", sm: "12px", md: "14px" } }}> *</span>}</InputLabel>
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
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {icon && <Tooltip title={toolTipTitle}>
                        <IconButton onClick={onClick} edge="end">
                          {icon}
                        </IconButton>
                      </Tooltip>}
                    </InputAdornment >
                  )
                }}
              />
              {statusError ? <Typography variant="p" sx={{ color: "red", mt: 1, lineHeight: 0, fontWeight: { xs: 400, md: 600 }, fontSize: { xs: "9px", sm: "10px", md: "12px", lg: "14px" } }}>{errorName}</Typography> :
                <ErrorMessage component={TextError} name={name} />}
            </>
          );
        }}
      </Field>
    </Grid >
  );
}

export default Input;

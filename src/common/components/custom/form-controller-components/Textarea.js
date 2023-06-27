import { Grid, InputLabel, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import "./style.css";

import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";


function Textarea(props) {
  const { label, name, onChangeFromController, errorName = "", statusError = false, isMandatory = false, disabled = false, ...rest } = props;

  const style = {
    border: "1px solid #C0E1EC",
    outline: "none",
    minHeight: "36px",
    font: "inherit",
    borderRadius: "10px",
    fontWeight: 400,
    fontSize: "18px",
    color: "#000",
    backgroundColor: disabled ? "hsl(0, 0%, 95%)" : "#fff"
  };

  return (
    <Grid sx={FORM_CONTROL_STYLE}>
      <InputLabel htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "14px" }}> *</span>}</InputLabel>
      <Field onKeyUp={onChangeFromController} className="formik-textarea" style={style} as='textarea' id={name} name={name} disabled={disabled} {...rest} />
      {statusError ? <Typography variant="p" sx={{ color: "red", mt: 1, lineHeight: 0 }}>{errorName}</Typography> :
        <ErrorMessage component={TextError} name={name} />}
    </Grid>
  );
}

export default Textarea;

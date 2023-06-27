import { Grid, InputLabel } from "@mui/material";
import { ErrorMessage, Field } from "formik";

import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";

function Files(props) {
  const { label, name, ...rest } = props;
  return (
    <Grid sx={FORM_CONTROL_STYLE}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field name={name} >
        {({ form, field }) => {
          const { handleChange } = form;
          return (
            <input id={name} name={name} type="file" {...field} {...rest} onChange={handleChange
            } className="form-control" />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </Grid>
  );
}

export default Files;

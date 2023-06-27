import { FormControl, Grid, Input, InputLabel } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";

function CustomInput(props) {
  const { label, name, ...rest } = props;
  return (
    <Grid sx={FORM_CONTROL_STYLE}>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Input id={name} {...rest} {...field} />
            <ErrorMessage>{form.errors[name]}</ErrorMessage>
          </FormControl>
        )}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </Grid>
  );
}

export default CustomInput;

import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";

const CustomCheckbox = (props) => {
  const { label, name, onChangeFromController, ...rest } = props;

  return (
    <Grid sx={FORM_CONTROL_STYLE}>
      <Field name={name} >
        {({ field, form }) => {
          return <FormControlLabel
            {...field}
            {...rest}
            id={name}
            control={<Checkbox />}
            label={label}
            checked={field.value || false}
            onChange={(e) => {
              form.setFieldValue(name, e.target.checked);
              onChangeFromController && onChangeFromController(e.target.checked);
            }
            }
          />;
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </Grid>
  );
};
export default CustomCheckbox;

import { ToggleButton, Grid } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

const CustomToggleButton = (props) => {
  const { label, name, onChangeFromController, ...rest } = props;

  return (
    <Grid>
      <Field name={name} >
        {({ field, form }) => {
          return <ToggleButton sx={{ p: "8px 14px" }}
            {...field}
            {...rest}
            id={name}
            label={label}
            value="check"
            selected={field.value || false}
            onChange={() => {
              form.setFieldValue(name, !field.value);
              onChangeFromController && onChangeFromController(!field.value);
            }
            }
          >{field.value ? "Y" : "N"}</ToggleButton>;
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </Grid>
  );
};
export default CustomToggleButton;

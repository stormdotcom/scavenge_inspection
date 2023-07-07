import { ToggleButton, Grid, InputLabel } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";


const CustomToggleButton = (props) => {
  const { label, name, onChangeFromController, ...rest } = props;

  return (
    <Grid sx={{ display: "flex", justifyContent: "space-between", pb: 1.5 }}>
      <Grid ds>
        <InputLabel htmlFor={name}>{label} </InputLabel>
      </Grid>
      <Grid>
        <Field name={name} >
          {({ field, form }) => {
            return <ToggleButton
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
            >{field.value ? "Yes" : "No"}</ToggleButton>;
          }}
        </Field>
      </Grid>
      <ErrorMessage component={TextError} name={name} />
    </Grid>
  );
};
export default CustomToggleButton;

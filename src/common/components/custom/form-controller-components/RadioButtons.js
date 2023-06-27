import { FormControlLabel, Grid, InputLabel, Radio, Stack } from "@mui/material";
import { ErrorMessage, Field } from "formik";

import TextError from "./TextError";

const RadioButtons = (props) => {
  const { label, name, options = [], ...rest } = props;
  return (
    <Grid sx={{ display: "flex", flexDirection: "row" }} >
      {label && <InputLabel>{label}</InputLabel>}
      {options.map(option => {
        return (
          <Field key={option.id} name={name}>
            {({ field }) => {

              return <>
                <Stack spacing={2} sx={{ m: 2 }}>
                  <FormControlLabel
                    control={<Radio />}
                    id={option.id}
                    {...field}
                    {...rest}
                    value={option.id}
                    checked={((typeof (field.value) === "object") ? field?.value?.id : field?.value) === (option?.id || "").toString()}
                  />
                  <InputLabel htmlFor={option.id}>{option.name}</InputLabel>
                </Stack>
              </>;
            }}
          </Field>
        );
      })}
      <ErrorMessage component={TextError} name={name} />
    </Grid >
  );
};

export default RadioButtons;

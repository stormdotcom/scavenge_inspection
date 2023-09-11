import { Box, FormControlLabel, Grid, InputLabel, Radio } from "@mui/material";
import { ErrorMessage, Field } from "formik";

import TextError from "./TextError";

const RadioButtons = (props) => {
  const { label, name, options = [], ...rest } = props;
  return (
    <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }} >
      {label && <InputLabel>{label}</InputLabel>}
      {options.map(option => {
        return (
          <Field key={option.id} name={name}>
            {({ field }) => {

              return <>
                <Box sx={{ my: 0.8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <FormControlLabel
                    control={<Radio sx={{
                      color: "grey",
                      "&.Mui-checked": {
                        color: "#fff"
                      }
                    }} />}
                    id={option.id}
                    {...field}
                    {...rest}
                    value={option.id}
                    checked={((typeof (field.value) === "object") ? field?.value?.id : field?.value) === (option?.id || "").toString()}
                  />
                  <InputLabel sx={{ fontWeight: { xs: 400, md: 700 }, fontSize: { xs: "11px", md: "14px" } }} htmlFor={option.id}>{option.name}</InputLabel>
                </Box>
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

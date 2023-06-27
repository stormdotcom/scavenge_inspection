import { Grid, InputLabel, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import Select from "react-select";
import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";


function CustomSelect(props) {
  const { name = "", options = [], multiple = false, label = "", errorName = "", statusError = false, onChangeFromController, disabled = false, isMandatory = false, ...rest } = props;
  return (
    <Grid sx={FORM_CONTROL_STYLE}>
      <InputLabel htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "14px" }}> *</span>}</InputLabel>
      <Field
        as='select'
        name={name}
      >
        {
          ({ field, form }) => {
            return (
              <>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: state.isFocused ? "1px solid #e8af13" : "1px solid #f0c246",
                      boxShadow: "none",
                      color: "#fff",
                      fontSize: "14px",
                      minHeight: "20px",
                      fontWeight: 400,
                      borderRadius: "5px",
                      backgroundColor: "#181b1e",
                      "&:hover": {
                        borderColor: "#d6a112"
                      }
                    }),
                    menuList: baseStyles => ({
                      ...baseStyles,
                      backgroundColor: "#181b1e"
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused ? "#303134" : "inherit"
                    }),
                    singleValue: baseStyles => ({
                      ...baseStyles,
                      color: "#fff"
                    })
                  }}
                  {...field}
                  {...rest}
                  id={name}
                  options={options}
                  onChange={value => {
                    onChangeFromController && onChangeFromController(value);
                    form.setFieldValue(field.name, value);
                  }}
                  isDisabled={disabled}
                  dropdownHeight={600}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  isMulti={multiple}
                  name={name}
                />
                {statusError ? <Typography variant="p" sx={{ color: "red", mt: 1, lineHeight: 0 }}>{errorName}</Typography> :
                  <ErrorMessage component={TextError} name={name} />}
              </>
            );
          }
        }
      </Field>
    </Grid>
  );
}

export default CustomSelect;

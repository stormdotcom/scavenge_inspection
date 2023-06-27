import { FormLabel, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as YearPicker } from "@mui/x-date-pickers/DatePicker";
import { Field, getIn } from "formik";
import _ from "lodash";

import "react-datepicker/dist/react-datepicker.css";
import { FORM_CONTROL_STYLE } from "./style";
import TextError from "./TextError";

const DatePicker = (props) => {
  const { label = "", name = "", mode = "", onChangeFromController, isMandatory = false, ...rest } = props;
  return (
    <Grid sx={FORM_CONTROL_STYLE}>
      <FormLabel htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "14px" }}> *</span>}</FormLabel>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value = "" } = field;
          const error = getIn(form.errors, name);
          const touch = getIn(form.touched);
          const touchedValue = _.some(touch, _.isEmpty);

          if (mode === "Date&&Time") {
            return (
              <>
                {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
                <DateTimePicker id={name}
                  {...field}
                  {...rest}
                  value={value}
                  renderInput={
                    (params) =>
                      <TextField sx={{ height: "40px" }} {...params} inputProps={{ ...params.inputProps, readOnly: true, style: { padding: "8px" } }} />
                  }
                  onChange={val => {
                    onChangeFromController && onChangeFromController(val);
                    setFieldValue(field.name, val);
                  }}
                  InputProps={{ error: props.error ? props.error : null }}
                />
                {/* </LocalizationProvider> */}
                {touchedValue ? <TextError>{error}</TextError> : ""}
              </>
            );
          } else if (mode === "Time") {
            return (
              <>
                {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
                <TimePicker
                  id={name}
                  {...field}
                  {...rest}
                  value={value}
                  onChange={val => {
                    onChangeFromController && onChangeFromController(val);
                    form.setFieldValue(field.name, val);
                  }}
                  renderInput={
                    (params) =>
                      <TextField sx={{ height: "40px" }} {...params} inputProps={{ ...params.inputProps, readOnly: true, style: { padding: "8px" } }} />
                  }
                  InputProps={{ error: props.error ? props.error : null }}
                />
                {/* </LocalizationProvider> */}
                {touchedValue ? <TextError>{error}</TextError> : ""}
              </>
            );
          } else if (mode === "Year") {
            return (
              <>
                {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
                <YearPicker
                  views={["year"]}
                  id={name}
                  {...field}
                  {...rest}
                  value={`01/01/${value}`}
                  onChange={(val) => {
                    const selectedYear = new Date(val).getFullYear();
                    onChangeFromController && onChangeFromController(selectedYear);
                    form.setFieldValue(field.name, selectedYear);
                  }}
                  renderInput={
                    (params) =>
                      <TextField sx={{ height: "50px" }} {...params} inputProps={{ ...params.inputProps, readOnly: true, style: { padding: "8.5px 14px" } }} />
                  }
                  InputProps={{ error: props.error ? props.error : null }}
                />
                {/* </LocalizationProvider> */}
                {touchedValue ? <TextError>{error}</TextError> : ""}
              </>
            );
          } else {
            return (
              <>
                {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
                <DesktopDatePicker
                  id={name}
                  {...field}
                  {...rest}
                  value={value}
                  onChange={val => {
                    onChangeFromController && onChangeFromController(val);
                    form.setFieldValue(field.name, val);
                  }}
                  renderInput={
                    (params) =>
                      <TextField sx={{ height: "40px" }} {...params} inputProps={{ ...params.inputProps, readOnly: true, style: { padding: "8px" } }} />
                  }
                  InputProps={{ error: props.error ? props.error : null }}
                />
                {/* </LocalizationProvider> */}
                {touchedValue ? <TextError>{error}</TextError> : ""}
              </>
            );
          }

        }}
      </Field>
    </Grid >
  );
};

export default DatePicker;

import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectInput = ({ label = "", value, options = [], onChange, name = "", sx = { p: 1 } }) => {
    // const defaultValue = options.length > 2 ? options[0].id : "";
    return (
        <FormControl fullWidth style={{ borderColor: "#fff", color: "white.main", "& label": { color: "white" }, ...sx }} >
            <InputLabel>{label}</InputLabel>
            <Select name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    );
};

export default SelectInput;

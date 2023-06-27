import * as React from "react";
import { createTheme, MenuItem, Select, ThemeProvider } from "@mui/material";

const selectTheme = createTheme({
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#009A93", borderRadius: "15px", color: "#fff", width: "100%", alignItems: "center"
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: "#fff",
                    right: "10px"
                },
                select: {
                    paddingLeft: "20px",
                    fontSize: "18px"
                },
                root: {
                    color: "#fff",
                    height: "40px",
                    boxShadow: "1px 1px 8px 5px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(71, 68, 68, 0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                    "&::before": {
                        borderBottom: 0
                    },
                    "&:hover": {
                        "&:not(.Mui-disabled, .Mui-error)::before": {
                            borderBottom: 0
                        }
                    }
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&&:hover": {
                        color: "#fff",
                        backgroundColor: "#009A93",
                        "& *": {
                            color: "white"
                        }
                    }
                }
            }
        }
    }
});

const MUISelect = ({ dataList = [], value = "", onItemSelect }) => {

    const handleChange = (e) => {
        onItemSelect && onItemSelect(e.target.value);
    };

    return (
        <ThemeProvider theme={selectTheme}>
            <Select variant="standard" value={value} onChange={handleChange} placeholder="Select one">
                {dataList.map((item) => (
                    <MenuItem key={item} value={item} >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </ThemeProvider>
    );
};

export default MUISelect;

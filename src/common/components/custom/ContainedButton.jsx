import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const HoverButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.secondary.dark
    }
}));

const ContainedButton = ({ type = "", onClick, children, sx = { fontWeight: 600, textTransform: "upper-case", fontSize: { xs: "16px", xl: "18px" }, height: { xs: "40px", xl: "50px" } } }) => {
    return (
        <HoverButton variant="contained" onClick={onClick} sx={sx} type={type}>
            {children}
        </HoverButton>
    );
};
export default ContainedButton;

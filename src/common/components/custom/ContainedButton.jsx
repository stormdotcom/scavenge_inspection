import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const HoverButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.secondary.dark
    },
}));

const ContainedButton = ({ onClick, children }) => {
    return (
        <HoverButton variant="contained" onClick={onClick}>
            {children}
        </HoverButton>
    );
};
export default ContainedButton;

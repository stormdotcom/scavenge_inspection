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

const ContainedButton = ({ onClick, children, sx = { fontWeight: 600, textTransform: "upper-case" } }, ...rest) => {
    return (
        <HoverButton variant="contained" onClick={onClick} sx={sx} {...rest}>
            {children}
        </HoverButton>
    );
};
export default ContainedButton;

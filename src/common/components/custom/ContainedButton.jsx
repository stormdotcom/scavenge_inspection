import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const HoverButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.secondary.dark
    }
}));

const ContainedButton = ({ icon = "", type = "", onClick, children, sx = { fontWeight: { xs: 400, md: 600 }, textTransform: "upper-case", fontSize: { xs: "12px", xl: "18px" }, height: { xs: "40px", xl: "50px" }, my: 0.8 } }) => {
    return (
        <HoverButton variant="contained" onClick={onClick} sx={sx} type={type}>
            {icon && <Box sx={{ display: "flex" }}>{icon}</Box>}
            {children}
        </HoverButton>
    );
};
export default ContainedButton;

import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box, CircularProgress } from "@mui/material";

const HoverButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.secondary.dark
    }
}));

const ContainedButton = ({ color, variant = "contained", icon = "", type = "", onClick, children, loader = false,
    sx = { fontWeight: { xs: 400, md: 600 }, textTransform: "upper-case", fontSize: { xs: "12px", xl: "18px" }, height: { xs: "40px", xl: "50px" }, my: 0.8 } }) => {
    return (
        <HoverButton color={color} variant={variant} onClick={onClick} sx={sx} type={type}>
            {icon && <Box sx={{ display: "flex" }}>{icon}</Box>}
            {children}
            <Box>
                {loader && (
                    <Box sx={{ display: "flex", alignItems: "center", position: "absolute", right: "10px", top: "10px" }}>
                        <CircularProgress size={18} thickness={4} sx={{ ml: 1, color: "white.main" }} />
                    </Box>
                )}
            </Box>

        </HoverButton>
    );
};
export default ContainedButton;

import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Menu = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    if (isLoggedIn) {
        return <Box sx={{ display: "flex", justifyContent: "space-evenly", pr: 2 }}>
            <Typography sx={{ color: "white.main", display: "inline", px: 2 }}> Report </Typography>
            <Typography sx={{ color: "white.main", display: "inline", px: 2 }}> Logout </Typography>
        </Box>;
    }

};

export default Menu;

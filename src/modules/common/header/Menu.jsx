import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import { STATE_REDUCER_KEY as COMMON } from "../constants";

const Menu = () => {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logout({ isManual: true }));
    const isLoggedIn = useSelector(state => state[COMMON].isLoggedIn);
    if (isLoggedIn) {
        return <Box sx={{ display: "flex", justifyContent: "space-evenly", pr: 2 }}>
            <Typography sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Report </Typography>
            <Typography onClick={handleLogout} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Logout  </Typography>
        </Box>;
    }

};

export default Menu;

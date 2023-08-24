import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import { STATE_REDUCER_KEY as COMMON, USER_TYPE } from "../constants";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => dispatch(logout({ isManual: true }));
    const isLoggedIn = useSelector(state => state[COMMON].isLoggedIn);
    const userType = useSelector(state => state[COMMON].user?.userType) || "";
    const isVessel = userType === USER_TYPE[0];
    if (isLoggedIn) {
        return <Box sx={{ display: "flex", justifyContent: "space-evenly", pr: 2 }}>
            {isVessel && <Typography onClick={() => navigate("../reports")} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Reports </Typography>}
            {isVessel && <Typography onClick={() => navigate("../profile")} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Profile  </Typography>}
            <Typography onClick={handleLogout} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Logout  </Typography>
        </Box>;
    }

};

export default Menu;

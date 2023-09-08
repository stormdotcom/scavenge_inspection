import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import { STATE_REDUCER_KEY as COMMON, USER_TYPE } from "../constants";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";


const HeaderMenu = ({ handleClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => dispatch(logout({ isManual: true }));
    const isLoggedIn = useSelector(state => state[COMMON].isLoggedIn);
    const userType = useSelector(state => state[COMMON].user?.userType) || "";
    const isVessel = userType === USER_TYPE[0];
    const isAdmin = userType === USER_TYPE[2];


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    if (!isSmallScreen) {
        if (isLoggedIn) {
            return <Box sx={{ display: "flex", justifyContent: "space-evenly", pr: 2 }}>
                {isVessel && <Typography onClick={() => navigate("../reports")} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Reports </Typography>}
                {isVessel && <Typography onClick={() => navigate("../profile")} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Profile  </Typography>}
                {isAdmin && <Typography onClick={() => navigate("../admin/config")} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Configuration  </Typography>}
                <Typography onClick={handleLogout} sx={{ color: "white.main", display: "inline", px: 2, cursor: "pointer" }}> Logout  </Typography>
            </Box>;
        }
    } else {
        return <Box sx={{ width: "100px", bgcolor: "green.main", display: "flex", justifyContent: "flex-end" }}>
            <MenuIcon onClick={handleClick} fontSize="large" sx={{ color: "white.main", cursor: "pointer" }} />
        </Box>;
    }

};

export default HeaderMenu;

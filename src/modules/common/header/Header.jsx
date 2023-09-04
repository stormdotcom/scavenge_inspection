import React from "react";
import { Components } from "../../../common/components";
import logoImg from "../../../assets/images/logoDark.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY, USER_TYPE } from "../constants";
import { Menu, MenuItem, Typography } from "@mui/material";
import HeaderMenu from "./HeaderMenu";
import { logout } from "../actions";
const { Box, Grid } = Components;

const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homePath = useSelector(state => state[STATE_REDUCER_KEY].homePath);
    const userType = useSelector(state => state[STATE_REDUCER_KEY].user?.userType) || "";
    const handleLogout = () => dispatch(logout({ isManual: true }));
    const isVessel = userType === USER_TYPE[0];
    const isAdmin = userType === USER_TYPE[2];

    // const { userDetails: { data: { activeProfile: { imageId = "" } = {}, firstName = "", lastName = "" } } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    return (
        <Grid
            component="header"
            sx={{ width: "100%", height: "82px", position: "sticky", top: -1, zIndex: 100, bgcolor: "primary.light", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
            <Box sx={{ mr: { sm: "0", md: "14%" } }} >
                <Box >
                    <img
                        onClick={() => navigate(`../${homePath}`)}
                        style={{ cursor: "pointer" }}
                        alt="logo_scavenge"
                        src={logoImg}
                        width={60}
                        height={60}
                    />
                </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "20px", md: "28px" }, fontWeight: 700, color: "#F4F4F4" }}>{"SCAVENGE INSPECTION REPORT"}</Typography>
                </Box>
            </Box>
            <Box >
                <Box>
                    <HeaderMenu handleClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button"
                        }}
                    >
                        {isVessel && <MenuItem onClick={() => navigate("../profile")}>Profile</MenuItem>}
                        {isVessel && <MenuItem onClick={() => navigate("../reports")}>Reports</MenuItem>}
                        {isAdmin && <MenuItem onClick={() => navigate("../admin/config")}>Configuration</MenuItem>}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Grid >
    );
};

export default Header;

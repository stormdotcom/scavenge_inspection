import React, { useEffect } from "react";
import { Tab, Tabs, Box, Grid } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabStyle = {
    width: "50%",
    color: "#b8b8b8",
    fontSize: { xs: "12px", md: "14px" }, fontWeight: { sm: 500, md: 700 },
    "&.MuiTabs-indicator": {
        bgcolor: "#fff",
        color: "#fff",
        height: "3px"
    },
    "&.Mui-selected": {
        color: "#fff",
        bgcolor: "secondary.main"
    }
};
const ProfileWrapper = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (location.pathname.includes("/info")) {
            setValue(0);
        }
        if (location.pathname.includes("/subscriptions")) {
            setValue(1);
        }
    }, []);

    return (
        <Grid sx={{ m: 0.1, mt: 3, overflow: "visible" }}>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
                    <Box sx={{ width: "80%" }}>
                        <Tabs sx={{ width: "100%" }} value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile >
                            <Tab sx={tabStyle} label={"Profile"} onClick={() => navigate("./info")} />
                            <Tab sx={tabStyle} label={"Subscriptions"} onClick={() => navigate("./subscriptions")} />
                        </Tabs>
                    </Box>
                </Box>
                <Outlet />
            </Box>
        </Grid >
    );
};

export default ProfileWrapper;

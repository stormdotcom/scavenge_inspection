import React, { useEffect } from "react";
import { Tab, Tabs, Box, Grid } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
                    <Tabs sx={{ bgcolor: "primary.light", width: "80%" }} value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile >
                        <Tab sx={{ color: "secondary.dark", width: "50%" }} label={"Profile"} onClick={() => navigate("./info")} />
                        <Tab sx={{ color: "secondary.dark", width: "50%" }} label={"Subscriptions"} onClick={() => navigate("./subscriptions")} />
                    </Tabs>
                </Box>
                <Outlet />
            </Box>

        </Grid >
    );
};

export default ProfileWrapper;

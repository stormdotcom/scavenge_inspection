import { Components } from "../../../common/components";
import logoImg from "../../../assets/images/logoDark.png";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../constants";
import { Typography } from "@mui/material";
const { Box, Grid } = Components;

const Header = () => {

    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    const navigate = useNavigate();
    const homePath = useSelector(state => state[STATE_REDUCER_KEY].homePath);

    // const { userDetails: { data: { activeProfile: { imageId = "" } = {}, firstName = "", lastName = "" } } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    return (
        <Grid
            component="header"
            sx={{ width: "100%", height: "82px", position: "sticky", top: -1, zIndex: 100, bgcolor: "primary.light", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
            <Box sx={{ width: "240px", position: "relative" }}>
                <Box sx={{ display: "flex", position: "absolute", top: "-20px", left: "10px" }}>
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
            <Box sx={{ position: "relative", width: "400px" }}>
                <Box sx={{ position: "absolute", left: { xs: "-20px", sm: "-80px" }, top: "-8px" }}>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "25px" }, fontWeight: 700, color: "#F4F4F4" }}>{"SCAVENGE INSPECTION REPORT"}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex", justifyContent: "center", alignItems: "center", mr: 5, borderRadius: "10px", p: 1, position: "relative"
                }}
            >
                <Box sx={{ position: "absolute", top: "8px", right: "-10px" }}>
                    <Menu />
                </Box>
            </Box>
        </Grid >
    );
};

export default Header;

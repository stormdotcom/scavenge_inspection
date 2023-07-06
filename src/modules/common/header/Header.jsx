import { Components } from "../../../common/components";
import logoImg from "../../../assets/images/logoDark.png";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../constants";
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
            <Box sx={{ width: "240px" }}>
                <Box sx={{ display: "flex", pl: 6 }}>
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
            <Box
                sx={{
                    display: "flex", justifyContent: "end", alignItems: "center", mr: 5, borderRadius: "10px", p: 1, position: "relative", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" }
                }}
                variant="contained" component="div"
            >
                {/* <ButtonBase sx={{}} onClick={handleClick}>
                    <SettingsOutlinedIcon sx={{ width: "30px", height: "33px", color: "white.main" }} />
                    <ChevronLeftOutlinedIcon sx={{ color: "white.main", transform: rotate }} />
                </ButtonBase> */}
            </Box>
            <Menu />
            {/* <ProfileMenu open={open} handleClose={handleClose} anchorEl={anchorEl} /> */}
        </Grid >
    );
};

export default Header;

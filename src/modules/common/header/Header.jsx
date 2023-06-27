import { Typography } from "@mui/material";
import { Components } from "../../../common/components";
import logoImg from "../../../assets/images/logoDark.png";
const { Box, Grid } = Components;

const Header = () => {

    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };


    // const { userDetails: { data: { activeProfile: { imageId = "" } = {}, firstName = "", lastName = "" } } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    return (
        <Grid
            component="header"
            sx={{ width: "100%", height: "82px", position: "sticky", top: 0, zIndex: 100, backgroundColor: "primary.main", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
            <Box sx={{ width: "240px" }}>
                <Box sx={{ display: "flex", pl: 6 }}>
                    <img
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
            <Box sx={{ display: "flex", justifyContent: "space-evenly", pr: 2 }}>
                <Typography sx={{ color: "white.main", display: "inline", px: 2 }}> Report </Typography>
                <Typography sx={{ color: "white.main", display: "inline", px: 2 }}> Logout </Typography>
            </Box>
            {/* <ProfileMenu open={open} handleClose={handleClose} anchorEl={anchorEl} /> */}
        </Grid >
    );
};

export default Header;

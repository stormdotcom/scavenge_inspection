import { Components } from "../../../common/components";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions";
import { useDispatch } from "react-redux";

const { MenuItem, Menu } = Components;
const ProfileMenu = ({ anchorEl, handleClose, open }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const active = open ? "block" : "none";
    const logOut = () => {
        dispatch(logout());
    };
    const listStyle = {
        mx: 1,
        pl: 2,
        pr: 4,
        "&:hover": {
            color: "primary.main"
        },
        fontSize: "16px"
    };
    return (
        <Menu
            sx={{ display: active, mt: 5, mr: 2 }}
            id="basic-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button"
            }}
        >
            <MenuItem
                onClick={() => {
                    handleClose();
                    navigate("../admin/profile");
                }}
                sx={listStyle}
            >
                {"profile"}
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleClose();
                    navigate("../admin/settings");
                }}
                sx={listStyle}
            >
                {"settings"}
            </MenuItem>
            <MenuItem
                onClick={logOut}
                sx={listStyle}
            >
                {"logout"}
            </MenuItem>
        </Menu >
    );
};

export default ProfileMenu;

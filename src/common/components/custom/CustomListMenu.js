import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import { Divider, ListItemIcon, MenuItem } from "@mui/material";
import { useState } from "react";
import { Icons } from "../material/Icons";

export default function CustomListMenu({ customActions, type = "" }) {
    const { CloudDownload } = Icons;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                {type === "download" ?
                    <>
                          <Tooltip title="Download">
                        <CloudDownload
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{ width: 22, height: 22 }} />
                        </Tooltip>
                    </>

                    : <>
                        <Tooltip title="Row actions">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <MoreVertIcon sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip></>}
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        "&:before": {
                            content: "\"\"",
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            // bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {customActions.map((ele, i) => {
                    return (
                        <MenuItem key={i} onClick={ele.handleClick}>
                            <ListItemIcon>
                                {ele.icon}
                            </ListItemIcon>
                            {ele.title}
                            <Divider />
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}

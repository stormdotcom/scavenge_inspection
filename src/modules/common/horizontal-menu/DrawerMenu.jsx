import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./module.style.css";
import DrawerDropdown from "./DrawerDropdown";
import { GiAbstract020, GiBackgammon, GiField, GiTeacher } from "react-icons/gi";
import { TbUser } from "react-icons/tb";
import { GoMailRead, GoReport } from "react-icons/go";

const DrawerMenu = ({ item, path, depth, index }) => {
    const location = useLocation();
    const [openCollapse, setOpenCollapse] = useState(true);
    function handleOpenSettings() {
        setOpenCollapse(!openCollapse);
    }
    const [link, setLInk] = useState("../");
    const navigate = useNavigate();
    if (item.path) {

        path += "/" + item.path;
    }
    useEffect(() => {
        setLInk(path);
    }, [path]);

    const navigator = () => {
        if (item.path) {

            navigate(link);
        }
    };
    let active = {
        color: "white.main",
        bgcolor: "secondary.main",
        "&:hover": {
            color: "white.main",
            bgcolor: "#0096C7"
        }
    };
    if (path === location.pathname) {
        active = {
            color: "secondary.main",
            bgcolor: "white.main",
            "&:hover": {
                color: "secondary.main",
                bgcolor: "white.main"
            },
            fontWeight: "700 !important"
        };
    }
    let icon = "";

    if (depth === 0) {
        if (index === 0) {
            icon = <TbUser />;
        } else if (index === 1) {
            icon = <GoMailRead />;
        } else if (index === 2) {
            icon = <GiField />;
        } else if (index === 3) {
            icon = <GiTeacher />;
        } else if (index === 4) {
            icon = <GoReport />;
        } else if (index === 5) {
            icon = <GiAbstract020 />;
        } else {
            icon = <GiBackgammon />;
        }
    }

    let hide = openCollapse ? "none" : "block";
    let rotate = openCollapse ? "rotate(-90deg)" : "rotate(90deg)";
    let listBackground = openCollapse ? "#000" : "";
    let activeLine = depth !== 0 ? {
        "&::before": {
            content: '""', // eslint-disable-line quotes
            position: "absolute",
            left: "-2px",
            top: "-12px",
            bottom: 0,
            height: "100%",
            borderLeft: "0.5px solid #b5f4ff"
        }
    } : "";
    return (
        < List sx={{ flexDirection: "column", alignItems: "start", color: "white.main", pl: 0.5 }} key={item.title} disablePadding >
            {item.title ? (
                <>
                    {
                        item.children ?
                            (<>

                                <ListItemButton sx={{
                                    ...activeLine, width: "100%", pl: 1
                                }} onClick={handleOpenSettings}>
                                    {icon}
                                    <ListItemText sx={{ pl: 1 }} primary={item.title} />
                                    <ChevronLeftOutlinedIcon className={openCollapse} sx={{ transform: rotate }} />
                                </ListItemButton >
                                <ListItem sx={{
                                    ...activeLine, display: hide, px: 1.5, bgcolor: listBackground
                                }}
                                >
                                    <DrawerDropdown submenu={item.children} path={path} depth={depth} />
                                </ListItem>
                            </>
                            ) :
                            <ListItem sx={{}} disablePadding>
                                <ListItemButton sx={{
                                    ...active, ...activeLine, textAlign: "", pl: 1.5

                                }}
                                    onClick={
                                        navigator
                                    }>
                                    <ListItemText sx={{ pl: 1 }} primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                    }
                </>
            ) : ""
            }
        </List >
    );
};

export default DrawerMenu;

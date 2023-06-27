import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { Link } from "react-router-dom";

import { Box, Typography, IconButton } from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DevicesIcon from "@mui/icons-material/Devices";

import { palette } from "../../../common/themes/theme";

const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <MenuItem
      active={selected === title}
      style={{ color: palette.palette.primary.light }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerlink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none"
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important"
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important"
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important"
        },
        "& .menu-item:hover": {
          color: `${palette.palette.primary.main} !important`,
          backgroundColor: `${palette.palette.secondary.main} !important`
        },
        "& .menu-item.active": {
          color: "#000",
          backgroundColor: `${palette.palette.primary.light} !important`
        }
      }}
    >
      <Sidebar
        breakPoint="md"
        backgroundColor={palette.palette.secondary.main}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed && (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: palette.palette.primary.main
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3">
                  Logo
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboards"
              to="/"
              icon={<DevicesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;

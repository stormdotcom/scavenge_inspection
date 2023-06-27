import { Box, Drawer, IconButton, List } from "@mui/material";
import menuClose from "../../../assets/images/menu-close.svg";
import DrawerMenu from "./DrawerMenu";

export default function Drawers({ handleDrawerToggle, mobileOpen, menuItems }) {
    const drawerWidth = 295;
    const drawer = (
        <Box sx={{}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ m: 1, ml: 2, mb: 3, display: { md: "none" } }}
                alt="menu"
                component="figure"
            >
                <Box component="img"
                    alt="close icon"
                    src={menuClose}
                    sx={{ width: "20px", height: "20px" }}
                />
            </IconButton>
            <List sx={{ pl: 2 }}>
                {menuItems[0].children.map((item, index) => (
                    item.title ? (
                        <DrawerMenu item={item} key={index} handleDrawerToggle={handleDrawerToggle} path="" />
                    ) : (<>
                    </>)
                ))}
            </List>
        </Box >
    );

    return (
        <Drawer
            BackdropProps={{ invisible: true }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true // Better open performance on mobile.
            }}
            sx={{
                display: { sm: "block", md: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
            }}
        >
            {drawer}
        </Drawer>
    );
}

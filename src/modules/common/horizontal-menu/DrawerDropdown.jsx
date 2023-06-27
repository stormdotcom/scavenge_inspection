import { List } from "@mui/material";
import DrawerMenu from "./DrawerMenu";

const DrawerDropdown = ({ submenu, path, depth }) => {
    depth++;
    return (
        <List sx={{ py: 0, px: 0 }}>
            {
                submenu.map((child, index) => (
                    <DrawerMenu key={index} item={child} path={path} depth={depth} />
                )
                )}
        </List>
    );
};

export default DrawerDropdown;

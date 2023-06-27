import { List } from "@mui/material";
import MenuItems from "./MenuItems";
const Dropdown = ({ submenus, dropdown, depthLevel, path }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu " : "";

  return (
    <List sx={{
      display: { sm: "block", md: "none" }, zIndex: 999, position: "absolute", top: "55px"
    }} className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {
        submenus.map((submenu, index) => (
          <MenuItems items={submenu} key={index} depthLevel={depthLevel} path={path} />
        ))
      }
    </List >
  );
};

export default Dropdown;

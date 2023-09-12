import { Box } from "@mui/material";
import React from "react";
import logoImg from "../../../assets/images/logoDark.png";

export const HomeIcon = ({ handleClick }) => {
    return <Box sx={{ display: "flex", position: "absolute", top: "5px", left: "10px" }}>
        <img
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            alt="logo_scavenge"
            src={logoImg}
            width={60}
            height={60}
        />
    </Box>;
};

import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const SquareStatsCad = ({ value = 0, type = "", title = "", cardType = "light" }) => {
    return <Paper sx={{ minWidth: "140px", bgcolor: cardType ? "primary.dark" : "primary.light", mx: 2, textAlign: "center", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", my: 2 }}>
                <Typography sx={{ textAlign: "center", color: "orange.main", fontWeight: 800, fontSize: "40px" }}> {value}</Typography>
                <Typography sx={{ textAlign: "center", fontWeight: 500, color: "white.main" }}> {title}</Typography>
            </Box>
            <Typography sx={{ textAlign: "center", color: "secondary.light", fontWeight: 700 }}> {type}</Typography>
        </Box>
    </Paper>;
};

export default SquareStatsCad;

import { Button, Grid } from "@mui/material";
import React from "react";

const SubscribeTermButton = ({ handleButton1, button1, button2 }) => {
    return (

        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%" }} >
            <Button
                sx={{
                    fontSize: { xs: "10px", sm: "15px" }, fontWeight: { md: 600, lg: 700 },
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    width: { xs: "20px", sm: "80px", md: "130px" },
                    p: 0,
                    m: 0,
                    backgroundColor: button1 ? "#EBD56D" : "#C0C0C0",
                    color: button1 ? "primary.main" : "primary.100",
                    "&:hover": {
                        backgroundColor: button1 ? "#e9d05c" : "#b6b6b6"
                    }
                }}
                onClick={handleButton1}
            > Monthly</Button>
            <Button
                sx={{
                    fontSize: { xs: "10px", sm: "15px" }, fontWeight: { md: 600, lg: 700 },
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    width: { xs: "20px", sm: "80px", md: "130px" },
                    p: 0,
                    P: 0,
                    m: "0px",
                    backgroundColor: button2 ? "#EBD56D" : "#C0C0C0",
                    color: button2 ? "primary.main" : "primary.100",
                    "&:hover": {
                        backgroundColor: button2 ? "#e9d05c" : "#b6b6b6"
                    }
                }}
                onClick={handleButton1}
            > Annually</Button>
        </Grid >

    );
};

export default SubscribeTermButton;

import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SubscribeTermButton from "./SubscriptionButton";
import SubScriptionBanner from "./SubscriptionBanner";
import { CUSTOMIZED_TIER, FREE_TIER, PREMIUM_TIER } from "../../../constants";

const Subscriptions = ({ plan = "PRO" }) => {
    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(true);
    const handleButton1 = () => {
        setButton1(prev => !prev);
        setButton2(prev => !prev);
    };
    return <Box sx={{ mt: 1, p: 2, textAlign: "center" }}>
        <Box>
            <Typography sx={{ color: "white.main", py: 1.5 }}> You're now in <span style={{ color: "#EBD56D" }}> {plan}</span>, Explore more plans.</Typography>
            <SubscribeTermButton handleButton1={handleButton1} button1={button1} button2={button2} />
        </Box>
        <Box>
            <Grid container rowSpacing={1} columnSpacing={3}>
                <Grid item xs={12} sm={12} md={4} >
                    <SubScriptionBanner
                        subTittle="Better features, affordable pricing"
                        type="Basic" premiumAmount="$ 1,000" features={FREE_TIER} />
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <SubScriptionBanner
                        subTittle="Elevate your experience"
                        type="Pro" premiumAmount="$ 1,500" features={PREMIUM_TIER} />
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <SubScriptionBanner
                        subTittle="Tailored to suit your needs"
                        type="Customized" premiumAmount="$0" features={CUSTOMIZED_TIER} customized={true} />
                </Grid>
            </Grid>
        </Box>
    </Box>;
};

export default Subscriptions;

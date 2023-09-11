import React from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { Icons } from "../../../common/components";
import TC_data from "./TC.json";
import _ from "lodash";
const { Close } = Icons;
const closeBtnStyle = {
    position: "relative",
    top: "32px",
    left: "94%",
    width: "20px",
    borderRadius: "15px",
    height: "20px"
};
const TermsAndCondition = ({ handleClose, open }) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="terms-and-conditions-title"
        aria-describedby="terms-and-conditions-description"
        maxWidth={"md"}
        fullWidth={true}
        sx={{ py: 3 }}
    >
        <IconButton sx={closeBtnStyle} onClick={handleClose} autoFocus>
            <Close sx={{ color: "white.main" }} />
        </IconButton>
        <DialogTitle sx={{ color: "secondary.light", fontWeight: 600, fontSize: "20px", textTransform: "uppercase" }} id="terms-and-conditions-title">
            {"Terms and Conditions"}
        </DialogTitle>
        <DialogContent sx={{ width: "100%", overflowY: "scroll", bgcolor: "primary.light" }}>
            <Box sx={{ color: "white.main" }} id="terms-and-conditions-description">

                <Box>
                    <Typography variant="h6" component="p"> {_.keys(TC_data)[0]}</Typography>
                    {_.map(TC_data.September2023Terms, (section, sectionIndex) => (
                        <Box key={sectionIndex} sx={{ py: 1 }}>
                            <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
                                {sectionIndex + 1}. {section.section}
                            </Typography>
                            {_.map(section.content, (point, pointIndex) => (
                                <Box key={pointIndex} sx={{ pl: 2 }}>
                                    <Typography component="p">
                                        {sectionIndex + 1}.{pointIndex + 1} {point}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ))}
                    {/* {_.keys(TC_data)[0]} */}
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {_.keys(TC_data)[1]}
                    </Typography>
                    <Typography variant="body1">
                        {_.get(TC_data, "Acknowledgement")}
                    </Typography>
                </Box>

            </Box>
        </DialogContent>
    </Dialog>;
};

export default TermsAndCondition;

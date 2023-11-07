import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, List, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import backgroundImage from "../../../assets/images/vesselBg.jpg";
import BackButton from "../../../common/components/custom/BackButton";
import ImageViewDocs from "./ImageViewDocs";
import { userGuide } from "./userGuideJSON";

const contentStyle = { color: "white.main", py: 0.4, letterSpacing: 0.1, wordSpacing: "1px", fontSize: { xs: "12px", sm: "14px", md: "17px" }, lineHeight: "1.7", fontWeight: { sm: 400, md: 500 } };
const titleStyle = { color: "white.main", py: 0.4, letterSpacing: 0.3, fontSize: { sm: "14px", md: "24px" }, fontWeight: 700 };
const accordionTitleStyle = { color: "white.main", py: 0.4, letterSpacing: 0.3, fontSize: { sm: "12px", md: "22px" }, fontWeight: 700 };
const listContentStyle = { color: "white.main", py: 0.4, letterSpacing: 0.1, wordSpacing: "1px", fontSize: { xs: "14px", sm: "18px", md: "20px" }, lineHeight: "1.7", fontWeight: { sm: 500, md: 600 } };

const DocumentationPage = () => {
    return <Grid height="100vh" container sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflowY: "hidden", width: 1, bgcolor: "primary.main", p: 0, display: "flex", alignItems: "center"
    }}>
        <Box sx={{ mt: 3, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", mb: { lg: "130px", xl: "140px" } }}>
            <Paper sx={{ borderRadius: "20px", px: 1, border: "1px solid #AD7E14", boxShadow: 0, height: "95vh", width: "90%", pb: { md: 2, lg: 1 } }}>
                <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <Box sx={{ px: { xs: 3, xl: 6 }, py: 4 }}>
                        <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "26px", lg: "30px", xl: "35px", textAlign: "left" }, color: "secondary.main", pb: 2, fontWeight: 600 }} >{"User Guide - Scavenge Inspection"}</Typography>
                        <BackButton path="../../signin" />
                        <Divider sx={{ color: "primary.light" }} />
                        <Box sx={{ width: "100%", height: { xs: "85vh", sm: "80vh", md: "70vh", lg: "75vh" }, overflowY: "scroll", pb: 3 }}>
                            <Box sx={{ width: "100%" }}>
                                <Typography sx={titleStyle}>{"Introduction"}</Typography>
                                <Typography sx={contentStyle}>
                                    Scavenge inspection is an AI based cylinder piston rings
                                    detection system. At its core, scavenge inspection harnesses the power of artificial intelligence to
                                    meticulously analyze and predict potential problems within the cylinders of ship engine.
                                    By combining advanced machine learning algorithms and data, this system enables fleet managers and engineers
                                    to stay ahead of the curve in maintenance and diagnostics</Typography>
                                < br />
                                <Typography sx={contentStyle}>
                                    With the ability to save and investigate older inspection reports it helps you to prevent engine failures and increase operational efficiencies and save substantial costs.
                                    Scavenge inspection brings ship owners, fleet managers, operators and engineers’ reliability, efficiency, and peace of mind. Discover the future of ship engine
                                    maintenance with Scavenge Inspection, where AI meets maritime excellence.</Typography>
                                <Typography sx={titleStyle}>{"Getting Started"}</Typography>
                                <Typography sx={contentStyle}> To start with the application, we have 3 different types of signup modes:</Typography>
                                <List>
                                    <ListItemText inset disableTypography sx={listContentStyle} primary="· New organization" />
                                    <ListItemText inset disableTypography sx={listContentStyle} primary="· Existing organization" />
                                    <ListItemText inset disableTypography sx={listContentStyle} primary="· New Vessel" />
                                </List>
                            </Box>
                            <Box>
                                {userGuide.sections.map((section, index) => (
                                    <Accordion key={index}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white.main" }} />}>
                                            <Typography sx={accordionTitleStyle} >{section.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {section.image && <ImageViewDocs imageUrl={section.image} />}
                                            {section.content.map(({ text, paragraphImage }, idx) => <Box key={idx}>
                                                <Typography sx={contentStyle}>{text}</Typography>
                                                {paragraphImage && <ImageViewDocs imageUrl={paragraphImage} />}
                                            </Box>)}

                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        </Box>
                        <Divider sx={{ width: "100%" }} />
                    </Box>
                </Grid>
            </Paper >
        </Box>
    </Grid >;

};

export default DocumentationPage;

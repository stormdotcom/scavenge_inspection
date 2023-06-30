import { Box } from "@mui/material";
import React from "react";
import ContainedButton from "../../../../common/components/custom/ContainedButton";

const ReportActions = () => {
    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box>
            <ContainedButton > Save</ContainedButton>
        </Box>
        <Box>
            <ContainedButton > Download PDF </ContainedButton>
        </Box>
        <Box>
            <ContainedButton > Download Excel </ContainedButton>
        </Box>
    </Box>;
};

export default ReportActions;

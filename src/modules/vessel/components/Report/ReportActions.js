import { Box, Grid } from "@mui/material";
import React from "react";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { useDispatch, useSelector } from "react-redux";
import { exportExcel, exportPdf, savePredicted } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";


const ReportActions = () => {
    const isPredicted = useSelector(state => state[STATE_REDUCER_KEY].isPredicted);
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(savePredicted());
    };
    const handlePdf = () => {
        dispatch(exportPdf());
    };
    const handleExcel = () => {
        dispatch(exportExcel());
    };
    if (isPredicted) {
        return <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
            <Grid container columnSpacing={3} sx={{ width: "80%" }}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <ContainedButton onClick={handleSave} > Save</ContainedButton>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <ContainedButton onClick={handlePdf}> Download PDF </ContainedButton>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <ContainedButton onClick={handleExcel}> Download Excel </ContainedButton>
                    </Box>
                </Grid>
            </Grid>
        </Box >;
    }
};

export default ReportActions;

import { Box } from "@mui/material";
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
    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isPredicted && <>
            <Box>
                <ContainedButton onClick={handleSave} > Save</ContainedButton>
            </Box>
            <Box>
                <ContainedButton onClick={handlePdf}> Download PDF </ContainedButton>
            </Box>
            <Box>
                <ContainedButton onClick={handleExcel}> Download Excel </ContainedButton>
            </Box>
        </>}
    </Box>;
};

export default ReportActions;

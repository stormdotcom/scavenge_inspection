import { Box } from "@mui/material";
import React from "react";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { useDispatch, useSelector } from "react-redux";
import { savePredicted } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";

const ReportActions = () => {
    const isPredicted = useSelector(state => state[STATE_REDUCER_KEY].isPredicted);
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(savePredicted());
    };
    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isPredicted && <>
            <Box>
                <ContainedButton onClick={handleSave} > Save</ContainedButton>
            </Box>
            <Box>
                <ContainedButton > Download PDF </ContainedButton>
            </Box>
            <Box>
                <ContainedButton > Download Excel </ContainedButton>
            </Box>
        </>}
    </Box>;
};

export default ReportActions;

import { Box } from "@mui/material";
import React from "react";
import ContainedButton from "../../../../common/components/custom/ContainedButton";
import { useDispatch, useSelector } from "react-redux";
import { exportExcel, exportPdf, savePredicted } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";
import { STATE_REDUCER_KEY as COMMON_STATE_KEY } from "../../../common";
const ReportActions = () => {
    const isPredicted = useSelector(state => state[STATE_REDUCER_KEY].isPredicted);
    const user = useSelector(state => state[COMMON_STATE_KEY].user);
    const reportDetails = useSelector(state => state[STATE_REDUCER_KEY].reportDetails);
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(savePredicted());
    };
    const handlePdf = () => {
        let data = {
            user: {

                _id: "64140bbcca0dfbcd9a68e193",

                email: "sridhar@test.com",

                mobile: "987654321"

            },
            info: {

                company_name: "One piece",

                vessel_name: "Luffy",

                imo_number: "2121212",

                manufacturer: "manufactur",

                type_of_engine: "Sailing",

                vessel_type: "Boat",

                inspection_date: "2023-06-01",

                total_running_hours: "66565",

                running_hrs_since_last: "100",

                cyl_oil_Type: "5454",

                cyl_oil_consump_Ltr_24hr: "54645",

                normal_service_load_in_percent_MCR: "65",

                cylinder_numbers: "6"

            },

            predictionInfo: {

                date: "2023-06-01",

                total_running_hours: "66565",

                cylinder1: {

                    lubrication: {

                        ring1: "*",

                        ring2: "*",

                        ring3: "*",

                        ring4: "*"

                    },

                    surface: {

                        ring1: "*",

                        ring2: "*",

                        ring3: "*",

                        ring4: "*"

                    },

                    deposit: {

                        ring1: "*",

                        ring2: "*",

                        ring3: "*",

                        ring4: "*"

                    },

                    breakage: {

                        ring1: "*",

                        ring2: "*",

                        ring3: "*",

                        ring4: "*"

                    },

                    image: "",

                    remark: ""

                }

            }
        };
        dispatch(exportPdf(data));
    };
    const handleExcel = () => {
        let data = {
            user, info: reportDetails.data, predictionInfo: reportDetails.data.predictionInfo
        };
        dispatch(exportExcel(data));
    };
    //user
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

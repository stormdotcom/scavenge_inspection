import { Box, Divider, FormControl, Grid, Input, Typography } from "@mui/material";
import React from "react";
import PredictionImage from "./PredictionImage";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY, predictedDataCol, predictedDataColOrder } from "../../constants";
import CustomReactTable from "../../../../common/components/custom/CustomReactTable";
import { useMemo } from "react";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../common/constants";
import { actions as sliceActions } from "../../slice";
import _ from "lodash";
const ReportOverView = () => {
    const dispatch = useDispatch();
    const columnsCylinderReport = useMemo(
        () => predictedDataCol,
        []
    );
    const options = {
        ...REACT_TABLE_COMMON_OPTIONS,
        enableRowActions: false,
        enableCustomPagination: false,
        enableRowNumbers: true,
        rowNumbersColumnTitle: "Ring Number",
        state: {
            columnOrder: predictedDataColOrder
        }
    };
    const handleRemarks = (e, key) => dispatch(sliceActions.setRemarks({ value: e.target.value, key }));

    const { data = {} } = useSelector(state => state[STATE_REDUCER_KEY].predictedData);
    // const { remarks = "" } = data.predictionDetails;
    return !_.isEmpty(data) ? <Box>
        {_.map(data, (value = {}, key) => (<Grid container key={key} spacing={2} sx={{ bgcolor: "primary.200", display: "flex", justifyContent: "space-evenly", p: 1, borderRadius: "5px" }}>
            <PredictionImage image={value?.image} cylinder={key} />
            {/* Table  data[key]*/}
            <Grid item xs={12} sm={6} md={9} lg={9} xl={9}>
                <CustomReactTable
                    data={value.predictionInfo || []}
                    columns={columnsCylinderReport}
                    options={options}
                    enableRowVirtualization={false}
                    enableCustomTableFilter={false}
                    enableRowNumbers={true}
                />
            </Grid>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <Typography htmlFor="remarks-field" sx={{ color: "#ffff" }}>Remarks</Typography>
                <Input
                    sx={{
                        backgroundColor: "#212529",
                        color: "#ffffff",
                        lineHeight: "28px"
                    }}
                    variant="filled"
                    value={value?.remarks}
                    onChange={(e) => handleRemarks(e, key)}
                    id="remarks-field"
                    label="Report"
                    multiline
                    maxRows={6}
                />
            </FormControl>
            <Divider sx={{
                width: "100%",
                bgcolor: "primary.dark"
            }} variant="inset" />
        </Grid>)


        )}
    </Box > : ""
        ;
};

export default ReportOverView;

import { Box, Grid } from "@mui/material";
import React from "react";
import PredictionImage from "./PredictionImage";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY, predictedDataCol, predictedDataColOrder } from "../../constants";
import _ from "lodash";
import CustomReactTable from "../../../../common/components/custom/CustomReactTable";
import { useMemo } from "react";
import { REACT_TABLE_COMMON_OPTIONS } from "../../../../common/constants";
const ReportOverView = () => {
    const columns = useMemo(
        () => predictedDataCol,
        []
    );
    const options = {
        ...REACT_TABLE_COMMON_OPTIONS,
        enableRowActions: false,
        enableCustomPagination: false,
        state: {
            columnOrder: predictedDataColOrder
        }
    };
    const { data = {} } = useSelector(state => state[STATE_REDUCER_KEY].predictedData);
    return !_.isEmpty(data) ? <Box>
        {_.map(data, (value = {}, key) =>
        (<Grid container key={key} spacing={2} sx={{ bgcolor: "primary.200", display: "flex", justifyContent: "space-evenly", p: 1, borderRadius: "5px" }}>
            <PredictionImage image={value?.image} cylinder={key} />
            {/* Table  data[key]*/}
            <Grid item sm={6} md={9} lg={9} xl={9}>
                <CustomReactTable
                    data={value.predictionInfo || []}
                    columns={columns}
                    options={options}
                    enableRowVirtualization={false}
                    enableCustomTableFilter={false}
                />
            </Grid>
        </Grid>)
        )}
    </Box > : ""
        ;
};

export default ReportOverView;

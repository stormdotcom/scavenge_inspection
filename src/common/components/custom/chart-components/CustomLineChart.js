import React, { useState } from "react";
import _ from "lodash";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Title, Tooltip } from "chart.js/auto";
import { DefaultComponents } from "common/components/material/Components";
import { getGradient, lineConfig } from "./config";
import MUISelect from "common/components/custom/CustomMUISelect";

const { Paper, Grid, Typography } = DefaultComponents;

ChartJS.register(
    BarElement,
    Title,
    Tooltip
);

const CustomLineChart = (props) => {
    const { dataList = {}, chartStyle = {}, title = "", legend = true, filter = false, gradient = false, fillColor = "#36A2EB", dataLabels = false } = props;
    const [select, setSelect] = useState("Last Week");
    const [newData, setNewData] = useState([61, 60, 70, 72, 66, 45, 43, 55, 70, 75, 80, 70]);
    const options = {
        ...lineConfig
        // scales: {
        //     y: {
        //         type: "logarithmic"
        //     }
        // }
    };


    let OPTIONS = _.cloneDeep(options);
    _.set(OPTIONS, "plugins.title", title);
    _.set(OPTIONS, "plugins.legend.display", legend);
    _.set(OPTIONS, "plugins.datalabels.display", dataLabels);

    // let dataSet = dataList.datasets.map(e => {
    //     const data = {
    //         label: e.label,
    //         data: e.data,
    //         borderColor: e.backgroundColor,
    //         backgroundColor: gradient ? function (context) {
    //             const chart = context.chart;
    //             const { ctx } = chart;
    //             return getGradient(ctx, fillColor);
    //         } : fillColor
    //     };
    //     return data;
    // });

    let dataSet = [{
        data: newData,
        fill: true,
        backgroundColor: gradient ? function (context) {
            const chart = context.chart;
            const { ctx } = chart;
            return getGradient(ctx, fillColor);
        } : fillColor,
        tension: 0.4
    }] || dataList.dataSets;

    let DATA = { datasets: dataSet, labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] };

    const selectList = ["Today", "Last Week", "Last Month", "Last Year"];

    const selectedItem = (value) => {
        setSelect(value);
        if (value === "Today") {
            setNewData([1, 2, 4, 6, 7, 7, 6, 5, 4, 3, 6, 8]);
        } else if (value === "Last Week") {
            setNewData([61, 60, 70, 72, 66, 45, 43, 55, 70, 75, 80, 70]);
        } else if (value === "Last Month") {
            setNewData([80, 100, 140, 134, 112, 80, 72, 95, 110, 140, 160, 120]);
        } else if (value === "Last Year") {
            setNewData([2404, 2040, 2800, 2808, 2064, 1800, 1702, 2200, 2080, 3000, 3200, 2800]);
        }
    };

    return (
        <Paper sx={{ p: 2, pb: 0, backgroundColor: "#0000", m: 1, border: "#86938E 1px solid", borderRadius: "30px" }}>
            {filter && <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={4}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <MUISelect value={select} dataList={selectList} onItemSelect={selectedItem} />
                </Grid>
            </Grid>}
            <div style={chartStyle}>
                <Line options={OPTIONS} data={DATA} />
            </div >
        </Paper>
    );
};

export default CustomLineChart;

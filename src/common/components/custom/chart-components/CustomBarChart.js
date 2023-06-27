import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, BarElement, Title, Tooltip } from "chart.js/auto";
import { DefaultComponents } from "common/components/material/Components";
import { barConfig } from "./config";
import _ from "lodash";

const { Paper, Typography } = DefaultComponents;

ChartJS.register(
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip
);

const BarChart = (props) => {
    const { dataList = {}, chartStyle = {}, axis, legend, title = "", position } = props;

    const options = {
        ...barConfig,
        indexAxis: axis && axis === "x" ? "y" : "x"
    };

    let OPTIONS = _.cloneDeep(options);
    _.set(OPTIONS, "plugins.legend.display", legend);
    _.set(OPTIONS, "plugins.legend.position", position);
    axis && _.set(OPTIONS, `scales.${axis}.type`, "logarithmic");


    return (
        <Paper sx={{ p: "20px", backgroundColor: "#0000", m: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <div style={chartStyle}>
                <Bar options={OPTIONS} data={dataList} style={{ width: "100%" }} />
            </div >
        </Paper>
    );
};

export default BarChart;


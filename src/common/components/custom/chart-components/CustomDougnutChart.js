import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, BarElement, Title, Tooltip } from "chart.js/auto";
import { DefaultComponents } from "common/components/material/Components";
import { doughnutConfig } from "./config";
import _ from "lodash";

const { Paper } = DefaultComponents;

ChartJS.register(
    ChartDataLabels,
    BarElement,
    Title,
    Tooltip
);

const DoughnutChart = (props) => {
    const { dataList = {}, chartStyle = {}, legend } = props;

    const options = {
        ...doughnutConfig
    };

    let label = _.get(dataList, "datasets.0.label", "");
    let OPTIONS = _.cloneDeep(options);
    _.set(OPTIONS, "plugins.legend.display", legend);
    _.set(OPTIONS, "plugins.legend.filltext", "No Data");
    _.set(OPTIONS, "plugins.title.display", true);
    _.set(OPTIONS, "plugins.title.text", label);

    return (
        <Paper sx={{ p: "20px", backgroundColor: "#0000", m: 2 }}>
            <div style={chartStyle}>
                <Doughnut options={OPTIONS} data={dataList} style={{ width: "100%" }} />
            </div >
        </Paper>
    );
};

export default DoughnutChart;


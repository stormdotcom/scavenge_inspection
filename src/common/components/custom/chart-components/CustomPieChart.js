import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Title, Tooltip } from "chart.js/auto";
import { DefaultComponents } from "common/components/material/Components";
import { pieConfig } from "./config";
import ChartFilter from "./CustomFilter";
import _ from "lodash";

const { Paper } = DefaultComponents;

ChartJS.register(
    BarElement,
    Title,
    Tooltip
);

const PieChart = (props) => {
    const { dataList = {}, chartStyle = {}, filter, legend } = props;

    const options = {
        ...pieConfig
    };

    let label = _.get(dataList, "datasets.0.label", "");
    let OPTIONS = _.cloneDeep(options);
    _.set(OPTIONS, "plugins.legend.display", legend);
    _.set(OPTIONS, "plugins.title.display", true);
    _.set(OPTIONS, "plugins.title.text", label);

    return (

        <Paper sx={{ p: "20px", backgroundColor: "#0000", m: 2 }}>
            {filter && <ChartFilter filter={filter} />}
            <div style={chartStyle}>
                <Pie options={OPTIONS} data={dataList} />
            </div >
        </Paper>
    );
};

export default PieChart;



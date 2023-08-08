import { fromEpochToMuiDate } from "../../utils/dateUtils";

export const STATE_REDUCER_KEY = "vessel";

export const columnsReport = [{
    id: "inspectionDate",
    header: "Inspection Date",
    accessorFn: (row) => fromEpochToMuiDate(row.inspection_date),
    size: 150
},
{
    id: "cyl_oil_Type",
    header: "Cyl. Oil Type",
    accessorKey: "cyl_oil_Type",
    size: 150
},
{
    id: "cyl_oil_consump_Ltr_24hr",
    header: "Oil Consumption (Ltr)",
    accessorKey: "cyl_oil_consump_Ltr_24hr",
    size: 150
},
{
    id: "cylinder_numbers",
    header: "Cylinder Number",
    accessorKey: "cylinder_numbers",
    size: 150
},
{
    id: "normal_service_load_in_percent_MCR",
    header: "Normal Service Load in % MCR",
    accessorKey: "normal_service_load_in_percent_MCR",
    size: 150
},
{
    id: "total_running_hours",
    header: "Total Running Hours",
    accessorKey: "total_running_hours",
    size: 150
},
{
    id: "running_hrs_since_last",
    header: "Last Running Hours",
    accessorKey: "running_hrs_since_last",
    size: 150
}
];


export const reportsColOrder = [
    "inspectionDate",
    "cylinder_numbers",
    "cyl_oil_consump_Ltr_24hr",
    "cyl_oil_Type",
    "thumbnailUrl",
    "normal_service_load_in_percent_MCR",
    "normal_service_load_in_percent_MCR",
    "total_running_hours",
    "running_hrs_since_last",
    "mrt-row-actions"
];

export const documentType = {
    pdf: "pdf",
    xls: "xls"
};


export const formatUser = (data = {}) => {
    let { _id = "", email = "", mobile = "" } = data;
    return { _id, email, mobile };
};

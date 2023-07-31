export const STATE_REDUCER_KEY = "vessel";

export const columnsReport = [{
    id: "inspectionDate",
    header: "Inspection Date",
    accessorKey: "inspection_date",
    size: 70
},
{
    id: "cyl_oil_Type",
    header: "Cyl. Oil Type",
    accessorKey: "cyl_oil_Type",
    size: 150
},
{
    id: "thumbnailUrl",
    header: "URL",
    size: 150
},
{
    id: "title",
    header: ("title"),
    accessorKey: "title",
    size: 250
}];


export const reportsColOrder = [
    "inspectionDate",
    "cyl_oil_Type",
    "thumbnailUrl",
    "title",
    "mrt-row-actions"
];

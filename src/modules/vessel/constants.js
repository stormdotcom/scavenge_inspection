import { fromEpochToMuiDate } from "../../utils/dateUtils";

export const STATE_REDUCER_KEY = "vessel";

export const predictedDataCol = [
    {
        id: "ringNo",
        header: "Ring Number",
        accessorKey: "ringNo",
        size: 50
    },
    {
        id: "lubricationCondition",
        header: "Lubrication Condition",
        accessorKey: "lubricationCondition",
        size: 150
    },
    {
        id: "surfaceCondition",
        header: "Surface Condition",
        accessorKey: "surfaceCondition",
        size: 150
    },
    {
        id: "depositsCondition",
        header: "Deposits Condition",
        accessorKey: "depositsCondition",
        size: 150
    },
    {
        id: "breakageCondition",
        header: "Breakage Condition",
        accessorKey: "breakageCondition",
        size: 150
    }
];
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

export const predictedDataColOrder = [
    "ringNo",
    "lubricationCondition",
    "surfaceCondition",
    "depositsCondition",
    "breakageCondition"
];

export const documentType = {
    pdf: "pdf",
    xls: "xls"
};


export const formatUser = (data = {}) => {
    let { _id = "", email = "", mobile = "" } = data;
    return { _id, email, mobile };
};

export const formatPredictedData = (data, date, total_running_hours) => {

    const formattedData = {
        predictionInfo: {
            date: fromEpochToMuiDate(date),
            total_running_hours
        }
    };
    for (const cylinderName in data) {
        const cylinderData = data[cylinderName];
        formattedData.predictionInfo[cylinderName] = {
            lubrication: {
                ring1: cylinderData.predictionInfo[0].lubricationCondition,
                ring2: cylinderData.predictionInfo[1].lubricationCondition,
                ring3: cylinderData.predictionInfo[2].lubricationCondition,
                ring4: cylinderData.predictionInfo[3].lubricationCondition
            },
            surface: {
                ring1: cylinderData.predictionInfo[0].surfaceCondition,
                ring2: cylinderData.predictionInfo[1].surfaceCondition,
                ring3: cylinderData.predictionInfo[2].surfaceCondition,
                ring4: cylinderData.predictionInfo[3].surfaceCondition
            },
            deposit: {
                ring1: cylinderData.predictionInfo[0].depositsCondition,
                ring2: cylinderData.predictionInfo[1].depositsCondition,
                ring3: cylinderData.predictionInfo[2].depositsCondition,
                ring4: cylinderData.predictionInfo[3].depositsCondition
            },
            breakage: {
                ring1: cylinderData.predictionInfo[0].breakageCondition,
                ring2: cylinderData.predictionInfo[1].breakageCondition,
                ring3: cylinderData.predictionInfo[2].breakageCondition,
                ring4: cylinderData.predictionInfo[3].breakageCondition
            },
            image: cylinderData.image,
            remark: ""
        };
    }

    return formattedData;
};


export const testData = {
    CYLINDER_1: {
        predictionInfo: [
            {
                lubricationCondition: null,
                surfaceCondition: "*",
                depositsCondition: null,
                breakageCondition: null
            },

            {
                lubricationCondition: null,
                surfaceCondition: null,
                depositsCondition: null,
                breakageCondition: "*"
            },

            {
                lubricationCondition: "*",
                surfaceCondition: null,
                depositsCondition: null,
                breakageCondition: null
            },

            {
                lubricationCondition: "*",
                surfaceCondition: null,
                depositsCondition: null,
                breakageCondition: null
            }
        ],
        image: ""
    },
    CYLINDER_2: {
        predictionInfo: [
            {
                lubricationCondition: null,
                surfaceCondition: "*",
                depositsCondition: null,
                breakageCondition: null
            },

            {
                lubricationCondition: null,
                surfaceCondition: null,
                depositsCondition: null,
                breakageCondition: "*"
            },

            {
                lubricationCondition: "*",
                surfaceCondition: null,
                depositsCondition: null,
                breakageCondition: null
            },

            {
                lubricationCondition: "123",
                surfaceCondition: null,
                depositsCondition: null,
                breakageCondition: null
            }
        ],
        image: ""
    }
};

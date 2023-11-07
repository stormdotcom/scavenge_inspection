export const STATE_REDUCER_KEY = "organization";

export const USER_TYPE = {
    VESSEL: "VESSEL",
    ORGANIZATION: "ORGANIZATION",
    ADMIN: "ADMIN"
};

export const columnsVesselList = [
    {
        id: "email",
        header: "Registered Email",
        accessorKey: "email",
        size: 150
    },
    {
        id: "vessel_name",
        header: "Vessel Name",
        accessorFn: ({ vesselDetails }) => vesselDetails?.vessel_name,
        size: 150
    },
    {
        id: "imo_number",
        header: "IMO Number",
        accessorFn: ({ vesselDetails }) => vesselDetails?.imo_number,
        size: 150
    },
    {
        id: "manufacturer",
        header: "Manufacturer",
        accessorFn: ({ vesselDetails }) => vesselDetails?.manufacturer,
        size: 150
    },
    {
        id: "type_of_engine",
        header: "Engine Type",
        accessorFn: ({ vesselDetails }) => vesselDetails?.type_of_engine,
        size: 150
    },
    {
        id: "vessel_type",
        header: "Vessel Type",
        accessorFn: ({ vesselDetails }) => vesselDetails?.vessel_type,
        size: 150
    },
    {
        id: "cylinder_numbers",
        header: "Cylinder Number",
        accessorFn: ({ inspectionDetails }) => inspectionDetails?.cylinder_numbers
    },
    {
        id: "approvedStatus",
        header: "Status",
        accessorFn: ({ approvedStatus }) => approvedStatus ? "Approved" : "Approval Pending",
        size: 150
    }
];


export const vesselListColOrder = [
    "vessel_name",
    "imo_number",
    "manufacturer",
    "type_of_engine",
    "vessel_type",
    "cylinder_numbers",
    "email",
    "approvedStatus",
    "mrt-row-actions"
];

export const FREE_TIER = [
    { name: "Basic user access", status: true },
    { name: "Unlimited inspection access", status: true },
    { name: "Limited reports download", status: true },
    { name: "Access older reports for a limited time", status: true },
    { name: "Can create 3 fleet managers", status: false },
    { name: "Can create 3 vessels under each fleet manager", status: false }
];
export const PREMIUM_TIER = [
    { name: "Basic user access", status: true },
    { name: "Unlimited inspection access", status: true },
    { name: "Unlimited reports download", status: true },
    { name: "Full access to all older reports", status: true },
    { name: "Can create 7 fleet managers", status: false },
    { name: "Can create 5 vessels under each fleet manager", status: false }
];
export const CUSTOMIZED_TIER = [
    { name: "Basic user access", status: true },
    { name: "Unlimited inspection access", status: true },
    { name: "Unlimited reports download", status: true },
    { name: "Full access to all older reports", status: true },
    { name: "Customized number of fleet managers", status: true },
    { name: "Customized number vessels under each fleet manager", status: true }
];

export const STATE_REDUCER_KEY = "admin";

export const columnsUsers = [
    {
        id: "fullName",
        header: "Full Name",
        accessorKey: "fullName",
        size: 150
    },
    {
        id: "email",
        header: "Email",
        accessorKey: "email",
        size: 150
    },
    {
        id: "userType",
        header: "User Type",
        accessorKey: "userType",
        size: 150
    },
    {
        id: "status",
        header: "Access Status",
        accessorFn: (row) => row.status ? "Access" : "Denied",
        size: 150
    }
];


export const usersColOrder = [
    "fullName",
    "email",
    "userType",
    "status",
    "mrt-row-actions"
];

export const columnsVessels = [
    {
        id: "vessel_name",
        header: "Vessel Name",
        accessorFn: (row) => row.vesselDetails.vessel_name,
        size: 150
    },
    {
        id: "imo_number",
        header: "IMO Number",
        accessorFn: (row) => row.vesselDetails.imo_number,
        size: 150
    },
    {
        id: "manufacturer",
        header: "Manufacturer",
        accessorFn: (row) => row.vesselDetails.manufacturer,
        size: 150
    },
    {
        id: "type_of_engine",
        header: "Type of Engine",
        accessorFn: (row) => row.vesselDetails.type_of_engine,
        size: 150
    },
    {
        id: "vessel_type",
        header: "Vessel Type",
        accessorFn: (row) => row.vesselDetails.vessel_type,
        size: 150
    },
    {
        id: "officerAdmin",
        header: "Fleet Manager",
        accessorFn: (row) => row.officerAdmin?.fullName || "",
        size: 150
    },
    {
        id: "organizationBelongsTo",
        header: "Organization",
        accessorFn: (row) => row.organizationBelongsTo?.company_name || "",
        size: 150
    },
    {
        id: "subscription",
        header: "Subscription Type",
        accessorFn: (row) => row.subscription.plan,
        size: 150
    },
    {
        id: "approvedStatus",
        header: "Approved Status",
        accessorFn: (row) => row.approvedStatus ? "APPROVED" : "PENDING",
        size: 150
    }
];

export const vesselColOrder = [
    "vessel_name",
    "imo_number",
    "manufacturer",
    "type_of_engine",
    "vessel_type",
    "officerAdmin",
    "organizationBelongsTo",
    "subscription",
    "approvedStatus",
    "mrt-row-actions"
];

export const columnsOrg = [
    {
        id: "company_name",
        header: "Organization Name",
        accessorKey: "company_name",
        size: 150
    },
    {
        id: "code",
        header: "Organization Code",
        accessorKey: "code",
        size: 150
    },
    {
        id: "domain",
        header: "Domain",
        accessorKey: "domain",
        size: 150
    },
    {
        id: "manager",
        header: "Organization Manager",
        accessorFn: (row) => row.manager?.fullName || "",
        size: 150
    }
];
export const orgColOrder = [
    "company_name",
    "code",
    "domain",
    "manager",
    "mrt-row-actions"
];

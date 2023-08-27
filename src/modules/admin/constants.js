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
        id: "phone",
        header: "Phone",
        accessorKey: "phone",
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
        accessorFn: (row) => row.status ? "Access" : "Blocked",
        size: 150
    }
];


export const usersColOrder = [
    "fullName",
    "email",
    "phone",
    "userType",
    "status"
];

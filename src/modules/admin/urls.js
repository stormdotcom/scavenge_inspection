export const API_URL = {
    DASHBOARD: {
        STATS: "auth/admin/dashboard"
    },
    USER: {
        LIST: "auth/admin/users-all",
        BY_ID: "auth/admin/users/:id",
        ACCESS_CONTROL: "auth/admin/restrict-user",
        UPDATE: "auth/admin/update-user",
        PASSWORD_UPDATE: "auth/admin/update-password"
    },
    VESSEL: {
        LIST: "auth/admin/vessel-all",
        BY_ID: "auth/admin/vessel/:id"
    },
    ORG: {
        LIST: "auth/admin/organizations",
        BY_ID: "auth/admin/organizations/:id",
        UPDATE: "auth/admin/organizations"
    }
};


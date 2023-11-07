export const STATE_REDUCER_KEY = "COMMON";

export const COMMON_TABLE_PAGINATION = { pageIndex: 0, pageSize: 5, totalCount: 0 };

export const COMMON_TABLE_INITIAL_STATE = {
    requestInProgress: false,
    data: [],
    pagination: COMMON_TABLE_PAGINATION,
    filters: {}
};

export const DEFAULT_TABLE_ID = "DEFAULT_TABLE";

export const EMAIL = (string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string);

export const SMS = (number) => !/\D/.test(number);


export const USER_TYPE = ["Vessel", "Organization", "Admin"];

export const SUBSCRIPTION_MODEL = {
    BASIC: "BASIC",
    STANDARD: "STANDARD",
    PREMIUM: "PREMIUM"
};

export const DESIGNATION = [
    "CHIEF_OFFICER",
    "OFFICER",
    "CREW"
];

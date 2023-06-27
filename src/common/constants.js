export const HTTP_CONSTANTS = {

  HTTP_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};


export const REQUEST_METHOD = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
  FILE: "FILE"
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN"
};

export const PROJECT_PROPS = {
  BRAND: {
    LOGO: "",
    NAME: "KSWMP-MIS - Trois"
  }
};

export const EMPTY_SELECT = { id: "", name: "SELECT" };

export const REACT_TABLE_COMMON_OPTIONS = {
  enableRowActions: true,
  enableRowSelection: true,
  getCanMultiSelect: true,
  enableSelectAll: false,
  enablePagination: false,
  enableGlobalFilter: false,
  enableColumnActions: false,
  enableDensityToggle: false,
  enableHiding: false,
  enableColumnFilterModes: false,
  enableStickyHeader: true,
  positionToolbarAlertBanner: "top",
  enableTopToolbar: false

};

export const SHOW_EXAMPLE_MODULE = false;

export const SHOW_IN_PROGRESS_MODULE = true;

export const ROWS_PER_PAGE = [10, 15, 20];

export const TABLE_IDS = {
  COMPLAINT_HISTORY: "COMPLAINT_HISTORY",
  COMPLAINT_TYPE: "COMPLAINT_TYPE",
  USER_MAPPING: "USER_ROLE_MAPPING",
  USER_MAPPING_UNASSIGN: "USER_ROLE_MAPPING_ASSIGN",
  USER_DATA_ACCESS: "USER_ROLE_DATA_ACCESS",
  OFFICERS_LIST: "OFFICERS_LIST",
  REGISTERED_USERS: "REGISTERED_USERS",
  TRAINING_NEED: "TRAINING_NEED",
  TRAINING_PLAN: "TRAINING_PLAN",
  TRAINING_COURSE: "TRAINING_COURSE",
  TRAINING_BATCH: "TRAINING_BATCH",
  COMPLAINT_REPORT: "COMPLAINT_REPORT",
  TRAINING_VENUE: "TRAINING_VENUE",
  VIEW_BATCH: "VIEW_BATCH",
  ADD_BATCH: "ADD_BATCH",
  TRAINING_SCHEDULE: "TRAINING_SCHEDULE",
  TRAINING_CERTIFICATE: "TRAINING_CERTIFICATE"

};

export const imageURL = `${process.env.REACT_APP_API_URL}/resource/api/auth/multimedia/download?id=`;


export const HTTP_CONSTANTS = {

  HTTP_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  FILE_EXPORT_HEADER: {
    "Content-Type": "application/json"
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
  ACCESS_TOKEN: "SCAV_ACCESS_TOKEN",
  REFRESH_TOKEN: "SCAV_REFRESH_TOKEN"
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

export const ROWS_PER_PAGE = [10, 15, 20];

export const USER_TYPE = ["Vessel", "Organization", "Admin"];

export const KEY_USER_TYPE = {
  VESSEL: USER_TYPE[0],
  ORG: USER_TYPE[1],
  ADMIN: USER_TYPE[2]
};

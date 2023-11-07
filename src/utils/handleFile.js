/* eslint-disable no-undef */
import { createAction } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../app/axios";
import { call, put } from "redux-saga/effects";
import { errorNotify, loaderNotify, successNotify } from "./notificationUtils";
import { HTTP_CONSTANTS, REQUEST_METHOD } from "../common/constants";

import { dismissNotification } from "reapop";

export const ERROR_CODE = {
    INVALID_TOKEN: 9401,
    TOKEN_REQUIRED: 9402,
    JWT_TOKEN_EXPIRED: 9000
};

const requestWrapper = (body = {}) => body;

const getRequestParams = ({ data, method }) => {
    let headers = HTTP_CONSTANTS.FILE_EXPORT_HEADER;
    let authHeaders = {};
    let extraParams = {};
    const api = (method === REQUEST_METHOD.POST) ? postRequest : getRequest;

    if ((method === REQUEST_METHOD.PUT || method === REQUEST_METHOD.PATCH || method === REQUEST_METHOD.POST)) {
        data = requestWrapper(data);
    }
    return { config: { headers: { ...headers, ...authHeaders }, ...extraParams }, data, api };
};

export const API_RESULT_CODE = {
    SUCCESS: 1,
    FAILURE: 0
};

export const RESPONSE_DATA = {
    FILE: "FILE"
};

function* invokeFileApi(method, baseURL, url, ext, fileName, payload) {
    const { types = ["REQUEST", "SUCCESS", "FAILURE"], data: payloadData } = payload;
    let requestAction = createAction(types[0]), successAction = createAction(types[1]), failureAction = createAction(types[2]);

    yield put(requestAction());
    yield put(loaderNotify({ title: "Downloading", message: `${fileName}.${ext}`, id: `${fileName}.${ext}` }));
    const { api, config, data } = getRequestParams({ url, data: payloadData, method });
    const apiResponse = yield call(api, url, { config, baseURL, data });
    const { data: response, error } = apiResponse;

    if (error) {
        yield put(failureAction({ error }));
        const { code: id, message: netWorkMessage, response: { statusText, data: { errorTitle, message } = {} } = {} } = error;
        yield put(errorNotify({ id, errorTitle: errorTitle, message: statusText || message || netWorkMessage }));
    } else {
        yield put(dismissNotification(`${fileName}.${ext}`));
        yield put(successNotify({ title: "Successfully Downloaded", message: `${fileName}.${ext}`, id: `${fileName}.${ext}` }));
        yield put(successAction());

        const fileType = ext === "pdf" ? "application/pdf" : "application/vnd.ms-excel";
        const urlFile = window.URL.createObjectURL(new Blob([response], { type: fileType }));
        const link = document.createElement("a");
        link.href = urlFile;
        link.setAttribute("download", `${fileName}.${ext}`);
        document.body.appendChild(link);
        link.click();
    }
    return { response, error };
}
export function* handleFileAPIRequest(apiFn, ...rest) {
    let { method, url, ext, fileName, payload } = apiFn(...rest);
    return yield call(invokeFileApi, method, url, ext, fileName, payload);
}

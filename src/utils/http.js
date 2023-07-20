/* eslint-disable no-undef */
import { createAction } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from "../app/axios";
import _ from "lodash";
// import { API_URL } from "modules/user-management/apiUrls";
import { call, delay, put } from "redux-saga/effects";
import { errorNotify, warningNotify } from "./notificationUtils";
import { HTTP_CONSTANTS, REQUEST_METHOD, STORAGE_KEYS } from "../common/constants";
import { logout } from "../modules/common/actions";
import { API_URL } from "../modules/user-management/apiUrls";

const HTTP_RESPONSE_STATUS = {
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const ERROR_CODE = {
    INVALID_TOKEN: 9401,
    TOKEN_REQUIRED: 9402,
    JWT_TOKEN_EXPIRED: 9000
};

const requestWrapper = (body = {}) => body;

const getRequestParams = ({ url, data, method }) => {
    let headers = HTTP_CONSTANTS.HTTP_HEADERS;
    let baseURL = "";
    let authHeaders = {};
    let bearerToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    let extraParams = {};

    const api = (method === REQUEST_METHOD.DELETE) ? deleteRequest : (method === REQUEST_METHOD.PUT) ? putRequest : (method === REQUEST_METHOD.PATCH) ? patchRequest : (method === REQUEST_METHOD.POST) ? postRequest : getRequest;
    baseURL = process.env.REACT_APP_API_URL;
    if (bearerToken) {
        authHeaders = { Authorization: `Bearer ${bearerToken}` };
    }
    // else {
    //     window.location.hash = "/";
    //     return;
    // }

    if ((method === REQUEST_METHOD.PUT || method === REQUEST_METHOD.PATCH || method === REQUEST_METHOD.POST) && url !== API_URL.AUTH.SIGN_IN) {
        data = requestWrapper(data);
    }

    if (method === REQUEST_METHOD.FILE) {
        extraParams.responseType = "blob";
    }

    return { config: { headers: { ...headers, ...authHeaders }, ...extraParams }, baseURL, data, api };
};

export const API_RESULT_CODE = {
    SUCCESS: 1,
    FAILURE: 0
};

function* invokeApi(method, url, payload) {
    const { types = ["REQUEST", "SUCCESS", "FAILURE"], data: payloadData } = payload;
    let requestAction = createAction(types[0]), successAction = createAction(types[1]), failureAction = createAction(types[2]);

    yield put(requestAction());
    const { api, config, baseURL, data } = getRequestParams({ url, data: payloadData, method });
    const apiResponse = yield call(api, url, { config, baseURL, data });
    const { data: response, error } = apiResponse;
    if (error) {
        yield put(failureAction({ error }));
        const { code: id, message: netWorkMessage, response: { status, statusText, data: { errorCode, errorTitle, message, resultString } = {} } = {} } = error;
        let errorMessage = {};
        switch (status) {
            case HTTP_RESPONSE_STATUS.BAD_REQUEST:
                errorMessage = { title: `${resultString || "ERROR"}`, message: message };
                break;
            case HTTP_RESPONSE_STATUS.UN_AUTHORIZED:
                {
                    if (errorCode === ERROR_CODE.JWT_TOKEN_EXPIRED) {
                        errorMessage = { title: "Token Expired", message: "Please login again." };
                        yield delay(500);
                        yield put(logout());
                    } else if (errorCode === ERROR_CODE.INVALID_TOKEN) {
                        errorMessage = { title: "Invalid Token", message: "Please login again." };
                        yield delay(500);
                        yield put(logout());
                    } else {
                        errorMessage = { title: `${errorTitle || statusText || netWorkMessage || "ERROR"}`, message: message };
                    }
                }
                break;
            case HTTP_RESPONSE_STATUS.NOT_FOUND:
            case HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR:
                errorMessage = { title: "Error", message: resultString || message || netWorkMessage };
                break;
            default:
                errorMessage = { title: `${status || ""} ${id || "ERROR"}`, message: resultString || message };
                break;
        }
        yield put(errorNotify({ id, ...errorMessage }));
    } else {
        if (_.get(response, "result", "") === API_RESULT_CODE.FAILURE) {
            yield put(warningNotify({ id: "ERROR_PRIMARY", title: "Operation Failure", message: _.get(response, "errorDescription", "Operation Failure") }));
            yield put(failureAction({}));
        }
        if (_.get(response, "result", "") !== API_RESULT_CODE.FAILURE) {
            yield put(successAction(response || {}));
        }

    }

    return { response, error };
}

export function* handleAPIRequest(apiFn, ...rest) {
    let { method, url, payload } = apiFn(...rest);
    return yield call(invokeApi, method, url, payload);
}

import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { signInApi, signUpApi, fetchOrgAdminsSagaApi, fetchCurrentUserAPI } from "./api";
import { handleAPIRequest } from "../../utils/http";
import { STORAGE_KEYS } from "../../common/constants";
import { navigateTo } from "../common/actions";
import { USER_TYPE } from "./constants";
import { actions as commonActions } from "../common/slice";
import _ from "lodash";

export function* signIn({ payload }) {
    yield fork(handleAPIRequest, signInApi, payload);
    const responseAction = yield take([ACTION_TYPES.SIGN_IN_FAILURE, ACTION_TYPES.SIGN_IN_SUCCESS]);
    if (responseAction.type === ACTION_TYPES.SIGN_IN_SUCCESS) {
        const { payload: { token } = {} } = responseAction;
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        yield fork(handleAPIRequest, fetchCurrentUserAPI, {});
        const profileResponseAction = yield take([ACTION_TYPES.USER_PROFILE_SUCCESS, ACTION_TYPES.USER_PROFILE_FAILURE]);
        if (profileResponseAction.type === ACTION_TYPES.USER_PROFILE_SUCCESS) {
            const { data: { userType = "" } = {} } = profileResponseAction.payload || {};
            if (userType === USER_TYPE.ADMIN) {
                yield put(navigateTo("/admin/dashboard"));
                yield put(commonActions.setHomePath("admin/dashboard"));
            } else if (userType === USER_TYPE.ORGANIZATION) {
                yield put(navigateTo("/org"));
                yield put(commonActions.setHomePath("org"));
            } else {
                yield put(navigateTo("/home"));
                yield put(commonActions.setHomePath("home"));
            }
        }
    }
}


export function* signUp({ payload }) {
    let formData = _.cloneDeep(payload);
    if (formData.organizationAdmin) {
        _.set(formData, "userType", USER_TYPE.VESSEL);
        _.set(formData, "organizationAdmin", _.get(formData, "organizationAdmin.id"));
    } else {
        _.set(formData, "organizationAdmin", "");
        _.set(formData, "userType", USER_TYPE.ORGANIZATION);
    }
    yield call(handleAPIRequest, signUpApi, formData);
}

export function* fetchOrgAdminsSaga({ payload }) {
    yield call(handleAPIRequest, fetchOrgAdminsSagaApi, payload);
}
export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SIGN_IN, signIn),
        takeLatest(ACTION_TYPES.SIGN_UP, signUp),
        takeLatest(ACTION_TYPES.FETCH_ORG_ADMINS, fetchOrgAdminsSaga)

    ]);
}

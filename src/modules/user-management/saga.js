import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { signInApi, signUpApi, fetchOrgAdminsSagaApi, fetchCurrentUserAPI, fetchOrgListApi, fetchOrgAdminDropdownApi, signUpVOApi, signUpVUApi } from "./api";
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
                yield put(navigateTo("/org/dashboard"));
                yield put(commonActions.setHomePath("org/dashboard"));
            } else {
                yield put(navigateTo("/home"));
                yield put(commonActions.setHomePath("home"));
            }
        }
    }
}


export function* signUp({ payload }) {
    let formData = _.cloneDeep(payload);
    if (!formData.newOrg) {
        _.set(formData, "userType", USER_TYPE.VESSEL);
        _.set(formData, "organizationAdmin", _.get(formData, "organizationAdmin.id"));
        _.set(formData, "company_name", _.get(formData, "company_name.name"));
    } else {
        _.set(formData, "organizationAdmin", "");
        _.set(formData, "userType", USER_TYPE.ORGANIZATION);
    }
    yield call(handleAPIRequest, signUpApi, formData);
}

export function* fetchOrgAdminsSaga({ payload }) {
    yield call(handleAPIRequest, fetchOrgAdminsSagaApi, payload);
}

export function* fetchOrgListSaga({ payload }) {
    yield call(handleAPIRequest, fetchOrgListApi, payload);
}

export function* fetchOrgAdminDropdown({ payload }) {
    yield call(handleAPIRequest, fetchOrgAdminDropdownApi, payload);
}

export function* signUpVOsaga({ payload }) {
    const formData = _.cloneDeep(payload);
    if (formData.isNewOrg === "existingOrg") {
        _.set(formData, "company_name", _.get(formData, "company_name._id"));
        _.set(formData, "isNewOrg", false);
    }
    if (formData.isNewOrg === "newOrg") {
        _.set(formData, "isNewOrg", true);
    }

    yield call(handleAPIRequest, signUpVOApi, formData);
}

export function* signUpVUSaga({ payload }) {
    const formData = _.cloneDeep(payload);
    _.set(formData, "officerAdmin", _.get(formData, "officerAdmin._id"));
    _.set(formData, "company_name", _.get(formData, "company_name._id"));
    yield call(handleAPIRequest, signUpVUApi, formData);
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SIGN_IN, signIn),
        takeLatest(ACTION_TYPES.SIGN_UP, signUp),
        takeLatest(ACTION_TYPES.FETCH_ORG_ADMINS, fetchOrgAdminsSaga),
        takeLatest(ACTION_TYPES.FETCH_ORG_LIST, fetchOrgListSaga),
        takeLatest(ACTION_TYPES.FETCH_ADMIN_BY_ORG, fetchOrgAdminDropdown),
        takeLatest(ACTION_TYPES.SIGN_UP_VO, signUpVOsaga),
        takeLatest(ACTION_TYPES.SIGN_UP_VU, signUpVUSaga)
    ]);
}

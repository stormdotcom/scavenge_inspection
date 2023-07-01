import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { signInApi, signUpApi, fetchOrgAdminsSagaApi } from "./api";
import { handleAPIRequest } from "../../utils/http";

export function* signIn({ payload: id }) {
    yield call(handleAPIRequest, signInApi, { id });
}

export function* signUp({ payload: id }) {
    yield call(handleAPIRequest, signUpApi, { id });
}

export function* fetchOrgAdminsSaga({ payload }) {
    yield call(handleAPIRequest, fetchOrgAdminsSagaApi, { domain: payload });
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SIGN_IN, signIn),
        takeLatest(ACTION_TYPES.SIGN_UP, signUp),
        takeLatest(ACTION_TYPES.FETCH_ORG_ADMINS, fetchOrgAdminsSaga)

    ]);
}

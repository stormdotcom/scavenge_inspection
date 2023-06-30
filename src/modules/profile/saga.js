import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { fetUserById } from "./api";
import { handleAPIRequest } from "../../utils/http";

export function* signIn({ payload: id }) {
    yield call(handleAPIRequest, fetUserById, { id });
}

export function* signUp({ payload: id }) {
    yield call(handleAPIRequest, fetUserById, { id });
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.SIGN_IN, signIn),
        takeLatest(ACTION_TYPES.SIGN_UP, signUp)

    ]);
}

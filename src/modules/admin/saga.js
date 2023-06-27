import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { fetUserById } from "./api";
import { handleAPIRequest } from "../../utils/http";

export function* fetchUser({ payload: id }) {
    yield call(handleAPIRequest, fetUserById, { id });
}


export default function* moduleSaga() {
    yield all([
        takeLatest(ACTION_TYPES.FETCH_USER_BY_ID, fetchUser)

    ]);
}

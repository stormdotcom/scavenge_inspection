
import { all, select, takeEvery, takeLatest } from "redux-saga/effects";

import { ACTION_TYPES } from "./actions";

// import { downloadFileAsync } from "utils/commonUtils";
import { STORAGE_KEYS } from "../../common/constants";
import { getNavigator } from "./selectors";


function* navigateToFn({ payload = "/" }) {
    const navigate = yield select(getNavigator);
    if (navigate instanceof Function) {
        yield navigate(payload);
    } else {
        // eslint-disable-next-line no-console
        console.error("navigate function not found");
    }

}
function* refreshFn() {
    const navigate = yield select(getNavigator);
    yield navigate(0);
}


function* logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    yield navigateToFn({ payload: "/" });
    // yield put(navigateTo("/"));
}


// export function* commonDownloadFile({ payload }) {
//     let { url, file, data = {} } = payload;
//     yield put(commonActions.setStatusModal({ isOpen: true, content: "downloading_file" + file.name || "download" }));
//     yield fork(handleAPIRequest, commonDownloadFileAPI, { url, data });
//     const response = yield take([ACTION_TYPES.COMMON_DOWNLOAD_FILE_SUCCESS, ACTION_TYPES.COMMON_DOWNLOAD_FILE_FAILURE]);
//     if (response.type === ACTION_TYPES.COMMON_DOWNLOAD_FILE_SUCCESS) {
//         yield call(downloadFileAsync, { response: response.payload, file });
//         yield put(commonActions.resetStatusModal());
//         yield put(successNotify({ title: "successfully", message: "downloaded" }));
//     } else if (response.type === ACTION_TYPES.COMMON_DOWNLOAD_FILE_FAILURE) {
//         yield put(commonActions.resetStatusModal());
//     }
// }

export default function* commonSaga() {
    yield all([
        yield takeLatest(ACTION_TYPES.LOG_OUT, logoutUser),
        yield takeEvery(ACTION_TYPES.NAVIGATE_TO, navigateToFn),
        yield takeEvery(ACTION_TYPES.REFRESH_CURRENT_PATH, refreshFn)
        // yield takeLatest(ACTION_TYPES.COMMON_DOWNLOAD_FILE, commonDownloadFile)
    ]);
}

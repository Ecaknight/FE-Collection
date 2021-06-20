// 请求登录saga
import { put, takeEvery, call, fork } from "redux-saga/effects";
import LoginService from "../services/login";

function* sagaHandle(action) {
  yield put({ type: "REQUEST" });

  try {
    const r1 = yield call(LoginService.login, action.payload);
    const r2 = yield call(LoginService.getMoreUserInfo, r1);
    yield put({ type: "LOGIN_SUCCESS", payload: r2 });
  } catch (err) {
    yield put({ type: "LOGIN_FAILURE", payload: err });
  }
}

// 监听
function* loginSaga() {
  yield takeEvery("LOGIN_SAGA", sagaHandle);
}

export default loginSaga;

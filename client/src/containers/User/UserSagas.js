import {
  put,
  call,
  takeLatest,
  select,
} from 'redux-saga/effects';
import callApi from 'utils/api';
import _ from 'lodash';
import getCookieMap from 'utils/cookies';
import { getUser } from 'containers/User/UserState';

export function* loginUser(action) {
  const response = yield call(
    callApi,
    'POST',
    '/auth/login',
    action.data,
    false,
  );

  const apiToken = _.get(response, 'json.token');
  const username = _.get(response, 'json.username');
  const userId = _.get(response, 'json.userId');

  if (apiToken !== undefined && username !== undefined && userId !== undefined) {
    document.cookie = `apiToken=${apiToken}`;

    const userResponse = yield call(
      callApi,
      'GET',
      `/users/${userId}`,
    );

    if (userResponse && userResponse.json) {
      yield put({ type: 'USER_GET_INSTANCE', data: userResponse.json });
    }
  }
}

export function* watchLoginUser() {
  yield takeLatest('LOGIN_USER', loginUser);
}

export function* logoutUser() {
  document.cookie = 'apiToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  yield put({ type: 'USER_GET_INSTANCE', data: {} });
}

export function* watchLogoutUser() {
  yield takeLatest('LOGOUT_USER', logoutUser);
}

export function* fetchUserFromToken() {
  const cookieMap = getCookieMap();

  if ('apiToken' in cookieMap) {
    const currentUser = yield select(getUser);

    if (!currentUser || !currentUser.username) {
      const response = yield call(
        callApi,
        'GET',
        '/users/current',
      );

      if (response && response.json) {
        yield put({ type: 'USER_GET_INSTANCE', data: response.json });
      } else {
        yield call(logoutUser);
      }
    }
  }
}

export function* watchFetchUserFromToken() {
  yield takeLatest('FETCH_USER_FROM_TOKEN', fetchUserFromToken);
}

export function* createUser(action) {
  const response = yield call(
    callApi,
    'POST',
    '/auth/register',
    action.data,
    false,
  );

  const userId = _.get(response, 'json._id');

  if (userId !== undefined) {
    yield call(loginUser, action);
  }
}

export function* watchCreateUser() {
  yield takeLatest('CREATE_USER', createUser);
}

export function* changePassword(action) {
  const currentUser = yield select(getUser);
  if (currentUser && currentUser._id) {
    yield call(
      callApi,
      'PUT',
      `/users/${currentUser._id}/password`,
      action.data,
    );

    const response = yield call(
      callApi,
      'GET',
      '/users/current',
    );

    if (response && response.json) {
      yield put({ type: 'USER_GET_INSTANCE', data: response.json });
    }
  }
}

export function* watchChangePassword() {
  yield takeLatest('CHANGE_PASSWORD', changePassword);
}

export function* changeUsername(action) {
  const currentUser = yield select(getUser);

  if (currentUser && currentUser._id) {
    yield call(
      callApi,
      'PUT',
      `/users/${currentUser._id}/username`,
      action.data,
    );

    const response = yield call(
      callApi,
      'GET',
      '/users/current',
    );

    if (response && response.json) {
      yield put({ type: 'USER_GET_INSTANCE', data: response.json });
    }
  }
}

export function* watchChangeUsername() {
  yield takeLatest('CHANGE_USERNAME', changeUsername);
}

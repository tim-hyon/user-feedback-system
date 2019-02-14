import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import callApi from 'utils/api';

export function* getFeedbackPosts() {
  const response = yield call(
    callApi,
    'GET',
    '/feedback-posts',
  );

  if (response && response.json) {
    yield put({ type: 'FEEDBACK_GET_COLLECTION', data: response.json });
  }
}

export function* watchGetFeedbackPosts() {
  yield takeLatest('GET_FEEDBACK_POSTS', getFeedbackPosts);
}

export function* getFeedbackPost(action) {
  const response = yield call(
    callApi,
    'GET',
    `/feedback-posts/${action.id}`,
    action.data,
  );

  if (response && response.json) {
    yield put({ type: 'FEEDBACK_GET_INSTANCE', data: response.json });
    yield call(getFeedbackPosts);
  }
}

export function* watchGetFeedbackPost() {
  yield takeLatest('GET_FEEDBACK_POST', getFeedbackPost);
}

export function* createFeedbackPost(action) {
  const response = yield call(
    callApi,
    'POST',
    '/feedback-posts',
    action.data,
  );

  if (response && response.json) {
    yield put({ type: 'FEEDBACK_GET_INSTANCE', data: response.json });
    yield call(getFeedbackPosts);
  }
}

export function* watchCreateFeedbackPost() {
  yield takeLatest('CREATE_FEEDBACK', createFeedbackPost);
}

export function* deleteFeedbackPost(action) {
  yield call(
    callApi,
    'DELETE',
    `/feedback-posts/${action.id}`,
  );

  yield call(getFeedbackPosts);
}

export function* watchDeleteFeedbackPost() {
  yield takeLatest('DELETE_FEEDBACK', deleteFeedbackPost);
}

export function* updateFeedbackPost(action) {
  const response = yield call(
    callApi,
    'PUT',
    `/feedback-posts/${action.id}`,
    action.data,
  );

  if (response && response.json) {
    yield put({ type: 'FEEDBACK_GET_INSTANCE', data: response.json });
    yield call(getFeedbackPosts);
  }
}

export function* watchUpdateFeedbackPost() {
  yield takeLatest('UPDATE_FEEDBACK', updateFeedbackPost);
}

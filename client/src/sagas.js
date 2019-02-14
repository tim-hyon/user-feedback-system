import { all, fork } from 'redux-saga/effects';
import {
  watchLoginUser,
  watchLogoutUser,
  watchCreateUser,
  watchFetchUserFromToken,
  watchChangePassword,
  watchChangeUsername,
} from 'containers/User/UserSagas';
import {
  watchGetFeedbackPosts,
  watchGetFeedbackPost,
  watchCreateFeedbackPost,
  watchDeleteFeedbackPost,
  watchUpdateFeedbackPost,
} from 'containers/FeedbackPost/FeedbackPostSagas';

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchCreateUser),
    fork(watchFetchUserFromToken),
    fork(watchChangePassword),
    fork(watchChangeUsername),

    fork(watchGetFeedbackPosts),
    fork(watchGetFeedbackPost),
    fork(watchCreateFeedbackPost),
    fork(watchDeleteFeedbackPost),
    fork(watchUpdateFeedbackPost),
  ]);
}

import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import user from 'containers/User/UserState';
import feedbackPost from 'containers/FeedbackPost/FeedbackPostState';

export default combineReducers({
  router: router5Reducer,
  user,
  feedbackPost,
});

import { combineReducers } from 'redux';

export default combineReducers({
  instance(state = {}, action) {
    switch (action.type) {
      case 'FEEDBACK_GET_INSTANCE':
        return action.data;
      default:
        return state;
    }
  },
  collection(state = [], action) {
    switch (action.type) {
      case 'FEEDBACK_GET_COLLECTION':
        return action.data;
      default:
        return state;
    }
  },
});

export const getFeedbackPost = state => state.feedbackPost.instance;
export const getFeedbackPosts = state => state.feedbackPost.collection;

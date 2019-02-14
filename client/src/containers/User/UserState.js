import { createSelector } from 'reselect';
import { combineReducers } from 'redux';

export default combineReducers({
  instance(state = {}, action) {
    switch (action.type) {
      case 'USER_GET_INSTANCE':
        return action.data;
      default:
        return state;
    }
  },
});

export const getUser = state => state.user.instance;

export const getUsername = createSelector(
  getUser,
  user => user && user.username,
);

export const getLastPasswordChange = createSelector(
  getUser,
  user => user && user.lastPasswordChange,
);

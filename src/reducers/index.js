import { combineReducers } from "redux";
import * as types from "../constants/ActionTypes";

const selectedSubreddit = (state = "input.txt", action) => {
  switch (action.type) {
    case types.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

const posts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case types.INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      };
    case types.REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case types.RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case types.INVALIDATE_SUBREDDIT:
    case types.RECEIVE_POSTS:
    case types.REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;

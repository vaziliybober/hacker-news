import { combineReducers } from 'redux';

import articles, { actions as articlesActions } from './articles.js';
import comments, { actions as commentsActions } from './comments.js';
import articlesFetching, { actions as articlesFetchingActions, fetchArticles } from './articlesFetching.js';
import commentsFetching, { actions as commentsFetchingActions, fetchComments } from './commentsFetching.js';
import repliesFetching, { actions as repliesFetchingActions, fetchReplies } from './repliesFetching.js';

export default combineReducers({
  articles,
  comments,
  articlesFetching,
  commentsFetching,
  repliesFetching,
});

const actions = {
  ...articlesActions,
  ...commentsActions,
  ...articlesFetchingActions,
  ...commentsFetchingActions,
  ...repliesFetchingActions,
};

const asyncActions = {
  fetchArticles,
  fetchComments,
  fetchReplies,
};

export { actions, asyncActions };

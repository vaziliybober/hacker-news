import { combineReducers } from 'redux';

import articles, { actions as articlesActions } from './articles.js';
import comments, { actions as commentsActions } from './comments.js';
import articlesFetching, { actions as articlesFetchingActions, fetchArticles } from './articlesFetching.js';
import commentsFetching, { actions as commentsFetchingActions, fetchComments } from './commentsFetching.js';
import descendantCommentsFetching, { actions as descendantCommentsFetchingActions, fetchDescendantComments } from './descendantCommentsFetching.js';

export default combineReducers({
  articles,
  comments,
  articlesFetching,
  commentsFetching,
  descendantCommentsFetching,
});

const actions = {
  ...articlesActions,
  ...commentsActions,
  ...articlesFetchingActions,
  ...commentsFetchingActions,
  ...descendantCommentsFetchingActions,
};

const asyncActions = {
  fetchArticles,
  fetchComments,
  fetchDescendantComments,
};

export { actions, asyncActions };

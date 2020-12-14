import { combineReducers } from 'redux';

import articles, { actions as articlesActions } from './articles.js';
import comments, { actions as commentsActions } from './comments.js';
import articlesFetching, { actions as articlesFetchingActions, fetchArticles } from './articlesFetching.js';
import rootCommentsFetching, { actions as rootCommentsFetchingActions, fetchRootComments } from './rootCommentsFetching.js';
import descendantCommentsFetching, { actions as descendantCommentsFetchingActions, fetchDescendantComments } from './descendantCommentsFetching.js';

export default combineReducers({
  articles,
  comments,
  articlesFetching,
  rootCommentsFetching,
  descendantCommentsFetching,
});

const actions = {
  ...articlesActions,
  ...commentsActions,
  ...articlesFetchingActions,
  ...rootCommentsFetchingActions,
  ...descendantCommentsFetchingActions,
};

const asyncActions = {
  fetchArticles,
  fetchRootComments,
  fetchDescendantComments,
};

export { actions, asyncActions };

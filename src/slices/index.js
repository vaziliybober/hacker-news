import { combineReducers } from 'redux';

import articles, { actions as articlesActions } from './articles.js';
import articlesFetching, { actions as articleFetchingActions, fetchArticles } from './articlesFetching.js';

export default combineReducers({
  articles,
  articlesFetching,
});

const actions = {
  ...articlesActions,
  ...articleFetchingActions,
};

const asyncActions = {
  fetchArticles,
};

export { actions, asyncActions };

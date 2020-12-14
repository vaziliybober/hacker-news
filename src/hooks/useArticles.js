import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selector = createSelector(
  (state) => state.articles,
  ({ byId, allIds }) => allIds.map((id) => byId[id]),
);

export default () => {
  const articles = useSelector(selector);
  const articlesActions = {};

  return [articles, articlesActions];
};

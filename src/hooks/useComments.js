import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selector = createSelector(
  (state) => state.comments,
  ({ byId, allIds }) => allIds.map((id) => byId[id]),
);

export default (article) => {
  const comments = useSelector(selector).filter((c) => c.parent === article.id);
  const commentsActions = {

  };

  return [comments, commentsActions];
};

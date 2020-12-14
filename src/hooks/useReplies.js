import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import { actions } from '../slices/index.js';

const selector = createSelector(
  (state) => state.comments,
  ({ byId, allIds }) => allIds.map((id) => byId[id]),
);

export default (comment) => {
  const dispatch = useDispatch();
  const replies = useSelector(selector).filter((c) => c.parent === comment.id);
  const repliesActions = {
    removeReplies: () => dispatch(actions.removeReplies({ comment })),
  };

  return [replies, repliesActions];
};

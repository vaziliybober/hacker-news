import { useSelector, useDispatch } from 'react-redux';

import { asyncActions } from '../slices/index.js';

export default (comment) => {
  const dispatch = useDispatch();
  const repliesFetching = useSelector((state) => state.repliesFetching)[comment.id];
  const fetchReplies = () => {
    if (repliesFetching !== 'requested') {
      dispatch(asyncActions.fetchReplies({ comment }));
    }
  };

  return [repliesFetching, fetchReplies];
};

import { useSelector, useDispatch } from 'react-redux';

import { asyncActions } from '../slices/index.js';

export default (article) => {
  const dispatch = useDispatch();
  const commentsFetching = useSelector((state) => state.commentsFetching);
  const fetchComments = () => {
    if (commentsFetching !== 'requested') {
      dispatch(asyncActions.fetchComments({ article }));
    }
  };

  return [commentsFetching, fetchComments];
};

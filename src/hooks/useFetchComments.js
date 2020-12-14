import { useSelector, useDispatch } from 'react-redux';

import { asyncActions } from '../slices/index.js';

export default (article) => {
  const dispatch = useDispatch();
  const commentsFetching = useSelector((state) => state.rootCommentsFetching);
  const fetchComments = () => {
    if (commentsFetching !== 'requested') {
      dispatch(asyncActions.fetchRootComments({ article }));
    }
  };

  return [commentsFetching, fetchComments];
};

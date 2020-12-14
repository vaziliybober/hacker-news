import { useSelector, useDispatch } from 'react-redux';

import { asyncActions } from '../slices/index.js';

export default () => {
  const dispatch = useDispatch();
  const articlesFetching = useSelector((state) => state.articlesFetching);
  const fetchArticles = () => {
    if (articlesFetching !== 'requested') {
      dispatch(asyncActions.fetchArticles());
    }
  };

  return [articlesFetching, fetchArticles];
};

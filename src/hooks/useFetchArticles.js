import { useSelector, useDispatch } from 'react-redux';

import { asyncActions } from '../slices/index.js';

export default () => {
  const dispatch = useDispatch();
  const articlesFetching = useSelector((state) => state.articlesFetching);
  const fetchArticles = (type = 'new') => {
    if (articlesFetching !== 'requested') {
      dispatch(asyncActions.fetchArticles(type));
    }
  };

  return [articlesFetching, fetchArticles];
};

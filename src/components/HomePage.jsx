import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Container, Spinner, ListGroup, Button,
} from 'react-bootstrap';

import Article from './Article.jsx';
import { asyncActions } from '../slices/index.js';

const articlesSelector = createSelector(
  (state) => state.articles,
  ({ byId, allIds }) => allIds.map((id) => byId[id]),
);

const HomePage = () => {
  const dispatch = useDispatch();
  const articlesFetching = useSelector((state) => state.articlesFetching);
  const articles = useSelector(articlesSelector);

  const fetchArticles = () => {
    if (articlesFetching !== 'requested') {
      dispatch(asyncActions.fetchArticles());
    }
  };

  useEffect(() => {
    fetchArticles();
    // const intervalId = setInterval(() => {
    //   fetchArticles();
    // }, 10000);

    // return () => { console.log(intervalId); clearInterval(intervalId); }
  }, []);

  return (
    <Container>
      <h1 className="text-center mt-4">Hacker News</h1>
      <div className={`text-center ${articlesFetching === 'requested' ? 'visible' : 'invisible'}`}>
        <Spinner animation="border" />
      </div>
      <div className="text-center mb-3">
        <Button
          variant="outline-dark pl-5 pr-5"
          disabled={articlesFetching === 'requested'}
          onClick={fetchArticles}
        >
          Reload
        </Button>
      </div>

      <ListGroup>
        {articles.map((a) => (
          <ListGroup.Item key={a.id}>
            <Article article={a} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default HomePage;

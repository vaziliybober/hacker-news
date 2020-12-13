import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Container, Spinner, ListGroup } from 'react-bootstrap';

import Article from './Article.jsx';

const articlesSelector = createSelector(
  (state) => state.articles,
  ({ byId, allIds }) => allIds.map((id) => byId[id]),
);

const HomePage = () => {
  const articlesFetching = useSelector((state) => state.articlesFetching);
  const articles = useSelector(articlesSelector);

  return (
    <Container>
      <h1 className="text-center mt-4">Hacker News</h1>
      <div className={`text-center ${articlesFetching === 'requested' ? 'visible' : 'invisible'}`}>
        <Spinner animation="border" />
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

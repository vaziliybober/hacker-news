import React, { useState } from 'react';
import {
  Container, Spinner, ListGroup, Button,
} from 'react-bootstrap';

import Article from './Article.jsx';
import useArticles from '../hooks/useArticles.js';
import useFetchArticles from '../hooks/useFetchArticles.js';
import useInterval from '../hooks/useInterval.js';

const HomePage = () => {
  const [articles] = useArticles();
  const [articlesFetching, fetchArticles] = useFetchArticles();
  const [articlesType, setArticlesType] = useState('new');

  useInterval(() => fetchArticles(articlesType), 10000);

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
          onClick={() => { fetchArticles('new'); setArticlesType('new'); }}
        >
          Reload (new)
        </Button>
        <Button
          variant="outline-dark pl-5 pr-5"
          disabled={articlesFetching === 'requested'}
          onClick={() => { fetchArticles('top'); setArticlesType('top'); }}
        >
          Reload (top)
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

import React, { useEffect } from 'react';
import {
  Container, Spinner, ListGroup, Button,
} from 'react-bootstrap';

import Article from './Article.jsx';
import useArticles from '../hooks/useArticles.js';
import useFetchArticles from '../hooks/useFetchArticles.js';
import useLogMount from '../hooks/useLogMount.js';

const HomePage = () => {
  const [articles] = useArticles();
  const [articlesFetching, fetchArticles] = useFetchArticles();

  useLogMount('HomePage');

  useEffect(() => {
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

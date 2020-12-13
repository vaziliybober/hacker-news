import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import Comments from './Comments.jsx';

const ArticlePage = () => {
  const {
    article,
    article: {
      url, title, time, by, kids,
    },
  } = useLocation().state;

  const history = useHistory();

  return (
    <Container>
      <h1 className="text-center mt-4">{title}</h1>
      <div className="d-flex flex-column align-items-center">
        <div className="lead">by</div>
        <span className="h3 font-italic mb-5">{by}</span>
        <div>{new Date(time * 1000).toString()}</div>
        {
          url ? <a className="text-center" href={url} target="_blank" rel="noreferrer">{url}</a>
            : <div className="text-muted">No link available</div>
        }
        <Button variant="outline-dark pl-5 pr-5" onClick={() => history.goBack()}>Back</Button>
      </div>
      <Comments article={article} />
    </Container>
  );
};

export default ArticlePage;

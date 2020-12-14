import React, { useEffect } from 'react';
import { ListGroup, Spinner, Button } from 'react-bootstrap';

import Comment from './Comment.jsx';
import useComments from '../hooks/useComments.js';
import useFetchComments from '../hooks/useFetchComments.js';
import useInterval from '../hooks/useInterval.js';

const Comments = (props) => {
  const { article } = props;
  const [commentsFetching, fetchComments] = useFetchComments(article);
  const [comments] = useComments(article);

  useEffect(fetchComments, []);

  useInterval(fetchComments, 60000);

  return (
    <section>
      <h1 className="text-center">Comments</h1>
      <div className={`text-center ${commentsFetching === 'requested' ? 'visible' : 'invisible'}`}>
        <Spinner animation="border" />
      </div>
      <div className="text-center mb-3">
        <Button
          variant="outline-dark pl-5 pr-5"
          disabled={commentsFetching === 'requested'}
          onClick={() => fetchComments()}
        >
          Reload
        </Button>
      </div>

      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c.id}>
            <Comment comment={c} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </section>

  );
};

export default Comments;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Interweave from 'interweave';
import { ListGroup, Spinner, Button } from 'react-bootstrap';

import CommentThread from './CommentThread.jsx';
import { actions, asyncActions } from '../slices/index.js';

const commentsSelector = createSelector(
  (state) => state.comments,
  ({ byId, allIds }) => allIds.map((id) => byId[id]),
);

const Comments = (props) => {
  const { article, article: { id } } = props;
  const dispatch = useDispatch();
  const commentsFetching = useSelector((state) => state.commentsFetching);
  const repliesFetching = useSelector((state) => state.repliesFetching);
  const comments = useSelector(commentsSelector).filter((c) => c.parent === id);
  const allComments = useSelector(commentsSelector);

  const [opened, setOpened] = useState({});

  const fetchComments = () => {
    if (commentsFetching !== 'requested') {
      dispatch(asyncActions.fetchComments({ article }));
    }
  };

  useEffect(() => {
    fetchComments();
    // const intervalId = setInterval(() => {
    //   fetchComments();
    // }, 10000);

    // return () => { console.log(intervalId); clearInterval(intervalId); }
  }, []);

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
            <div
              className={`${c.kids ? 'btn ' : ''}text-left`}
              role="listitem"
              onClick={() => {
                if (repliesFetching[c.id] !== 'requested') {
                  if (opened[c.id]) {
                    dispatch(actions.removeReplies({ comment: c }));
                    setOpened((prev) => ({ ...prev, [c.id]: false }));
                  } else {
                    dispatch(asyncActions.fetchReplies({ comment: c }));
                    setOpened((prev) => ({ ...prev, [c.id]: true }));
                  }
                }
              }}
            >
              <div>
                <span className="font-weight-bold">
                  {`${c.kids ? (opened[c.id] ? 'v ' : '> ') : '- '}[${c.by}]: `}
                </span>
                <span>
                  <Interweave content={c.text} />
                </span>

              </div>
              <div className={`text-center ${repliesFetching[c.id] === 'requested' ? 'visible' : 'invisible'}`}>
                <Spinner animation="border" />
              </div>
            </div>

            <CommentThread allComments={allComments} parentComment={c} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </section>

  );
};

export default Comments;

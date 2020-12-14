import React, { useState } from 'react';
// import cn from 'classnames'
import Interweave from 'interweave';
import { Spinner } from 'react-bootstrap';

import CommentThread from './CommentThread.jsx';
import useReplies from '../hooks/useReplies.js';
import useFetchReplies from '../hooks/useFetchReplies.js';

const Comment = (props) => {
  const { comment, comment: { text, by, kids } } = props;

  const [repliesFetching, fetchReplies] = useFetchReplies(comment);
  const [, { removeReplies }] = useReplies(comment);
  const [opened, setOpened] = useState();

  // FIXME: fix linter errors
  /* eslint-disable */
  return (
    <article>
      <div
        className={`${kids ? 'btn ' : ''}text-left`}
        onClick={() => {
          if (repliesFetching !== 'requested') {
            if (opened) {
              removeReplies();
              setOpened(false);
            } else {
              fetchReplies();
              setOpened(true);
            }
          }
        }}
      >
        <div>
          <span className="font-weight-bold">
            {`${kids ? (opened ? 'v ' : '> ') : '-- '}[${by}]: `}
          </span>
          <span>
            <Interweave content={text} />
          </span>

        </div>
        <div className={`text-center ${repliesFetching === 'requested' ? 'visible' : 'invisible'}`}>
          <Spinner animation="border" />
        </div>
      </div>
      <CommentThread comment={comment} />
    </article>
  );
};

export default Comment;

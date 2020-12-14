import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Interweave from 'interweave';

import useReplies from '../hooks/useReplies.js';

const CommentThread = (props) => {
  const { comment } = props;
  const [replies] = useReplies(comment);

  return (
    <section>
      <ListGroup>
        {replies.map((r) => (
          <ListGroup.Item key={r.id}>
            <div>
              <span className="font-weight-bold">
                {`[${r.by}]: `}
              </span>
              <span>
                <Interweave content={r.text} />
              </span>
            </div>
            <CommentThread comment={r} />
          </ListGroup.Item>
        ))}
      </ListGroup>

    </section>

  );
};

export default CommentThread;

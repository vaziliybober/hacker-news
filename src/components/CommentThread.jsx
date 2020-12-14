import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Interweave from 'interweave';

const CommentThread = (props) => {
  const { allComments, parentComment } = props;
  const comments = allComments.filter((c) => c.parent === parentComment.id);

  return (
    <section>
      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c.id}>
            <div>
              <span className="font-weight-bold">
                {`[${c.by}]: `}
              </span>
              <span>
                <Interweave content={c.text} />
              </span>
            </div>
            <CommentThread allComments={allComments} parentComment={c} />
          </ListGroup.Item>
        ))}
      </ListGroup>

    </section>

  );
};

export default CommentThread;

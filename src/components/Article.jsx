import React from 'react';
import { Link } from 'react-router-dom';

const Article = (props) => {
  const {
    article, article: {
      title, by, score, time, id,
    },
  } = props;

  return (
    <article>
      <Link
        className="text-decoration-none"
        to={{
          pathname: `/${id}`,
          state: {
            article,
          },
        }}
      >
        <div className="text-dark">
          <span className="font-weight-bold">{title}</span>
          <span>
            {' '}
            (by
            {by}
            )
          </span>
          <span className="font-italic">
            {' '}
            Rating:
            {score}
          </span>
          <div>{new Date(time).toString()}</div>
        </div>

      </Link>
    </article>
  );
};

export default Article;

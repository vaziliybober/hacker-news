import axios from 'axios';

import urls from './urls.js';

export const fetchArticles = async () => {
  const { data } = await axios.get(urls.articles());
  const ids = data.slice(0, 100);
  const promises = ids.map((id) => axios.get(urls.article(id)));
  const results = await Promise.allSettled(promises);
  const articles = results
    .filter((res) => res.status === 'fulfilled')
    .map((res) => res.value.data);

  return articles;
};

export const fetchComments = async (ids) => {
  const promises = ids.map((id) => axios.get(urls.comment(id)));
  const results = await Promise.allSettled(promises);
  const comments = results
    .filter((res) => res.status === 'fulfilled')
    .map((res) => res.value.data);

  return comments;
};

export const fetchReplies = async (ids) => {
  if (ids.length === 0) {
    return [];
  }
  const rootComments = await fetchComments(ids);
  const descendantIds = rootComments.flatMap((c) => c.kids || []);
  const descendantComments = await fetchReplies(descendantIds);

  return [...rootComments, ...descendantComments];
};

const newArticles = () => 'https://hacker-news.firebaseio.com/v0/newstories.json';
const topArticles = () => 'https://hacker-news.firebaseio.com/v0/topstories.json';
const article = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
const comment = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

export default {
  newArticles,
  topArticles,
  article,
  comment,
};

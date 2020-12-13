const articles = () => 'https://hacker-news.firebaseio.com/v0/newstories.json';
const article = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
const comment = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

export default {
  articles,
  article,
  comment,
};

/* eslint-disable class-methods-use-this */
import axios from 'axios';

import urls from './urls.js';

export default class HackerNewsAPI {
  async fetchArticles() {
    const { data } = await axios.get(urls.articles());
    const ids = data.slice(0, 100);
    const promises = ids.map((id) => axios.get(urls.article(id)));
    const results = await Promise.allSettled(promises);
    const articles = results
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value.data);

    return articles;
  }

  async fetchComments(ids) {
    const promises = ids.map((id) => axios.get(urls.comment(id)));
    const results = await Promise.allSettled(promises);
    const comments = results
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value.data);

    return comments;
  }

  async fetchReplies(ids) {
    if (ids.length === 0) {
      return [];
    }
    const rootComments = await this.fetchComments(ids);
    const descendantIds = rootComments.flatMap((c) => c.kids || []);
    const descendantComments = await this.fetchReplies(descendantIds);

    return [...rootComments, ...descendantComments];
  }
}

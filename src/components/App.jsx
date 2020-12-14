import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage.jsx';
import ArticlePage from './ArticlePage.jsx';
import useFetchArticles from '../hooks/useFetchArticles.js';

export default () => {
  const [, fetchArticles] = useFetchArticles();

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/:id">
          <ArticlePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage.jsx';
import ArticlePage from './ArticlePage.jsx';

export default () => (
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

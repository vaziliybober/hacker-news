import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home.jsx';
import Article from './Article.jsx';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/:id">
        <Article />
      </Route>
    </Switch>
  </BrowserRouter>
);

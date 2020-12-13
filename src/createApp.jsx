import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import reducer from './slices/index.js';

export default () => {
  const store = configureStore({
    reducer,
  });

  // store.dispatch(asyncActions.fetchArticles());

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

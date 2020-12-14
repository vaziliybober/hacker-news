import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import HackerNewsAPI from '../hackerNewsAPI.js';

const api = new HackerNewsAPI();

const getFetcher = (type) => {
  switch (type) {
    case 'new':
      return () => api.fetchNewArticles();
    case 'top':
      return () => api.fetchTopArticles();
    default:
      throw new Error(`Invalid fetchArticles type: ${type}`);
  }
};

export const fetchArticles = createAsyncThunk('ARTICLES_FETCH', async (type = 'new') => {
  const articles = await getFetcher(type)();
  return { articles };
});

const slice = createSlice({
  name: 'articlesFetching',
  initialState: 'none',
  reducers: {},
  extraReducers: {
    [fetchArticles.fulfilled]: () => 'finished',
    [fetchArticles.pending]: () => 'requested',
    [fetchArticles.rejected]: () => 'failed',
  },
});

export const { actions } = slice;
export default slice.reducer;

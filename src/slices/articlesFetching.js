import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import HackerNewsAPI from '../hackerNewsAPI.js';

const api = new HackerNewsAPI();

export const fetchArticles = createAsyncThunk('ARTICLES_FETCH', async () => {
  const articles = await api.fetchArticles();
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

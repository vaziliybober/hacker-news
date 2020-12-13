import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchArticles as fetcher } from '../hackerNewsAPI.js';

export const fetchArticles = createAsyncThunk('ARTICLES_FETCH', async () => {
  const articles = await fetcher();
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

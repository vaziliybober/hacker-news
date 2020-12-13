import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import urls from '../urls.js';

export const fetchArticles = createAsyncThunk('FETCH ARTICLES', async () => {
  const { data } = await axios.get(urls.articles());
  const ids = data.slice(0, 100);
  const promises = ids.map((id) => axios.get(urls.article(id)));
  const results = await Promise.allSettled(promises);
  const articles = results
    .filter((a) => a.status === 'fulfilled')
    .map((a) => a.value.data);

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

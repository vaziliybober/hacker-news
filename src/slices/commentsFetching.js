/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import HackerNewsAPI from '../hackerNewsAPI.js';

const api = new HackerNewsAPI();

export const fetchComments = createAsyncThunk('COMMENTS_FETCH', async ({ article }) => {
  const comments = await api.fetchComments(article.kids || []);
  return { comments };
});

const slice = createSlice({
  name: 'commentsFetching',
  initialState: 'none',
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled]: () => 'finished',
    [fetchComments.pending]: () => 'requested',
    [fetchComments.rejected]: () => 'failed',
  },
});

export const { actions } = slice;
export default slice.reducer;

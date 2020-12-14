/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import HackerNewsAPI from '../hackerNewsAPI.js';

const api = new HackerNewsAPI();

export const fetchRootComments = createAsyncThunk('ROOT_COMMENTS_FETCH', async ({ article }) => {
  const comments = await api.fetchComments(article.kids || []);
  return { comments };
});

const slice = createSlice({
  name: 'commentsFetching',
  initialState: 'none',
  reducers: {},
  extraReducers: {
    [fetchRootComments.fulfilled]: () => 'finished',
    [fetchRootComments.pending]: () => 'requested',
    [fetchRootComments.rejected]: () => 'failed',
  },
});

export const { actions } = slice;
export default slice.reducer;

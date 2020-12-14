/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import HackerNewsAPI from '../hackerNewsAPI.js';

const api = new HackerNewsAPI();

export const fetchReplies = createAsyncThunk('REPLIES_FETCH', async ({ comment }) => {
  const replies = await api.fetchReplies(comment.kids || []);
  return { replies };
});

const slice = createSlice({
  name: 'repliesFetching',
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchReplies.fulfilled]: (state, { meta }) => {
      const { arg: { comment } } = meta;
      state[comment.id] = 'finished';
    },
    [fetchReplies.pending]: (state, { meta }) => {
      const { arg: { comment } } = meta;
      state[comment.id] = 'requested';
    },
    [fetchReplies.rejected]: (state, { meta }) => {
      const { arg: { comment } } = meta;
      state[comment.id] = 'failed';
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

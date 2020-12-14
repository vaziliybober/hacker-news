/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import HackerNewsAPI from '../hackerNewsAPI.js';

const api = new HackerNewsAPI();

export const fetchDescendantComments = createAsyncThunk('DESCENDANT_COMMENTS_FETCH', async ({ comment }) => {
  const replies = await api.fetchReplies(comment.kids || []);
  return { replies };
});

const slice = createSlice({
  name: 'descendantCommentsFetching',
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchDescendantComments.fulfilled]: (state, { meta }) => {
      const { arg: { comment } } = meta;
      state[comment.id] = 'finished';
    },
    [fetchDescendantComments.pending]: (state, { meta }) => {
      const { arg: { comment } } = meta;
      state[comment.id] = 'requested';
    },
    [fetchDescendantComments.rejected]: (state, { meta }) => {
      const { arg: { comment } } = meta;
      state[comment.id] = 'failed';
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

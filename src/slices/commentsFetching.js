/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchComments as fetcher } from '../hackerNewsAPI.js';

export const fetchComments = createAsyncThunk('COMMENTS_FETCH', async ({ article }) => {
  const fake = [8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940,
    9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998,
    8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876];
  const comments = await fetcher(article.kids ?? fake); // FIXME: remove fake
  comments.forEach((c) => { c.parent = article.id; });
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

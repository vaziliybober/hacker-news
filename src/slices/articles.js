/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { fetchArticles } from './articlesFetching.js';

const slice = createSlice({
  name: 'articles',
  initialState: {
    byId: {}, allIds: [],
  },
  reducers: {},
  extraReducers: {
    [fetchArticles.fulfilled]: (state, { payload }) => {
      const { articles } = payload;
      state.byId = Object.fromEntries(articles.map((a) => [a.id, a]));
      state.allIds = articles.map((a) => a.id);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

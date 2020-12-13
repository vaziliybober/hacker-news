/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { fetchComments } from './commentsFetching.js';
import { fetchReplies } from './repliesFetching.js';

const slice = createSlice({
  name: 'comments',
  initialState: {
    byId: {}, allIds: [],
  },
  reducers: {
    removeReplies: (state, { payload }) => {
      const findDescendantIds = (pid) => {
        const childrenIds = state.allIds.filter((id) => state.byId[id].parent === pid);
        const descendantIds = childrenIds.flatMap((id) => findDescendantIds(id));
        return [...childrenIds, ...descendantIds];
      };
      const { comment } = payload;

      const remainingIds = _.difference(state.allIds, findDescendantIds(comment.id));
      const newById = _.pick(state.byId, remainingIds);

      return {
        byId: newById,
        allIds: remainingIds,
      };
    },
  },
  extraReducers: {
    [fetchComments.fulfilled]: (state, { payload }) => {
      const { comments } = payload;
      return {
        byId: { ...state.byId, ...Object.fromEntries(comments.map((c) => [c.id, c])) },
        allIds: _.union(state.allIds, comments.map((r) => r.id)),
      };
    },
    [fetchReplies.fulfilled]: (state, { payload }) => {
      const { replies } = payload;
      return {
        byId: { ...state.byId, ...Object.fromEntries(replies.map((r) => [r.id, r])) },
        allIds: _.union(state.allIds, replies.map((r) => r.id)),
      };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

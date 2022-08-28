import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CommentStore } from '../../types/comment-store';
import { fetchCommentsAction, sendCommentAction } from '../api-actions';

const initialState: CommentStore = {
  comments: [],
  commentError: '',
};

export const commentStore = createSlice({
  name: NameSpace.Comment,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.comments = [];
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.commentError = '';
      })
      .addCase(sendCommentAction.rejected, (state, action) => {
        state.commentError = 'Something went wrong, try again later';
      });
  }
});

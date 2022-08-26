import { createSlice } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { store } from '..';
import { APIRoute, NameSpace } from '../../const';
import { CommentStore } from '../../types/comment-store';
import { redirectToRoute } from '../action';
import { fetchCommentsAction, postCommentAction } from '../api-actions';

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
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.commentError = '';
        store.dispatch(redirectToRoute(generatePath(APIRoute.Film, { filmId: String(action.payload) })));
      })
      .addCase(postCommentAction.rejected, (state, action) => {
        state.commentError = 'Something went wrong, try again later';
      });
  }
});

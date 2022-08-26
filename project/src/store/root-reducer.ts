import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { commentStore } from './comment-store/comment-store';
import { filmStore } from './film-store/film-store';
import { userStore } from './user-store/user-store';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmStore.reducer,
  [NameSpace.User]: userStore.reducer,
  [NameSpace.Comment]: commentStore.reducer,
});

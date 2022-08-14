import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Films } from '../types/film';

export const selectGenre = createAction<{ genre: string }>('genre/selectGenre');
export const getSortedFilmsList = createAction('films/getSortedFilmsList');
export const loadFilms = createAction<Films>('data/loadFilms');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
export const setLoginError = createAction<string>('user/setLoginError');

import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Comments } from '../types/comment';
import { Film, Films } from '../types/film';

export const selectGenre = createAction<{ genre: string }>('genre/selectGenre');
export const getSortedFilmsList = createAction('films/getSortedFilmsList');
export const loadFilms = createAction<Films>('data/loadFilms');
export const loadSimilar = createAction<Films>('data/loadSimilar');
export const loadOneFilm = createAction<Film>('data/loadOneFilm');
export const cleanOneFilm = createAction('data/cleanOneFilm');
export const loadPromo = createAction<Film>('data/loadPromo');
export const loadComments = createAction<Comments>('data/loadComments');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
export const setLoginError = createAction<string>('user/setLoginError');

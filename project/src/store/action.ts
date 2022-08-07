import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/film';

export const selectGenre = createAction<{ genre: string }>('genre/selectGenre');
export const getSortedFilmsList = createAction('films/getSortedFilmsList');
export const loadFilms = createAction<Films>('data/loadFilms');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

import { createAction } from '@reduxjs/toolkit';

export const selectGenre = createAction<{ genre: string }>('genre/selectGenre');
export const getFilmsList = createAction('films/getFilmsList');

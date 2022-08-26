import { NameSpace } from '../../const';
import { Film, Films } from '../../types/film';
import { State } from '../../types/state';

export const getFilms = (state: State): Films => state[NameSpace.Film].films;
export const getFilm = (state: State): Film => state[NameSpace.Film].film;
export const getPromoFilm = (state: State): Film => state[NameSpace.Film].promoFilm;
export const getSimilarFilms = (state: State): Films => state[NameSpace.Film].similarFilms;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.Film].isDataLoading;
export const getIsFilmLoading = (state: State): boolean => state[NameSpace.Film].isFilmLoading;
export const getSortedFilms = (state: State): Films => state[NameSpace.Film].sortedFilms;
export const getGenre = (state: State): string => state[NameSpace.Film].genre;
export const getFavorite = (state: State): Films => state[NameSpace.Film].favorite;

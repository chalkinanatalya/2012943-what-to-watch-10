import { createReducer } from '@reduxjs/toolkit';
import { AllGENRES, AuthorizationStatus } from '../const';
import { filmsList } from '../mocks/films';
import { similarFilms } from '../mocks/similar-films';
import { Film, Films } from '../types/film';
import { selectGenre, getSortedFilmsList, loadFilms, setDataLoadingStatus, requireAuthorization, setLoginError } from './action';

type InitialStateType = {
  films: Films,
  sortedFilms: Films,
  genre: string,
  similarFilms: Films,
  promoFilm: Film,
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean,
  loginError: string,
}

const initialState: InitialStateType = {
  films: [],
  sortedFilms: [],
  genre: AllGENRES,
  similarFilms: similarFilms,
  promoFilm: filmsList[0],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: true,
  loginError: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(getSortedFilmsList, (state, action) => {
      if (state.genre === AllGENRES) {
        state.sortedFilms = state.films;
      } else {
        state.sortedFilms = state.films.filter((film) => film.genre === state.genre);
      }
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.sortedFilms = state.films;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setLoginError, (state, action) => {
      state.loginError = action.payload;
    });
});

export { reducer };

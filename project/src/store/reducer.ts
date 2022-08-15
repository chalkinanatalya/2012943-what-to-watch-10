import { createReducer } from '@reduxjs/toolkit';
import { AllGENRES, AuthorizationStatus } from '../const';
import { Film, Films } from '../types/film';
import { selectGenre, getSortedFilmsList, loadFilms, setDataLoadingStatus, requireAuthorization, setLoginError, loadPromo, loadSimilar } from './action';

export const emptyFilm: Film = {
  id: -1,
  name: '',
  posterImage: '',
  previewImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  rating: -1,
  scoresCount: -1,
  director: '',
  starring: [],
  runTime: -1,
  genre: '',
  released: -1,
  isFavorite: false,
};

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
  similarFilms: [],
  promoFilm: emptyFilm,
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
    .addCase(loadSimilar, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload;
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

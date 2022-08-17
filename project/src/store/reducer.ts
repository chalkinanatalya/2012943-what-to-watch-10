import { createReducer } from '@reduxjs/toolkit';
import { AllGENRES, AuthorizationStatus } from '../const';
import { Comments } from '../types/comment';
import { Film, Films } from '../types/film';
import { selectGenre, getSortedFilmsList, loadFilms, setDataLoadingStatus, requireAuthorization, setLoginError, loadPromo, loadSimilar, loadOneFilm, cleanOneFilm, loadComments, setCommentError, setFilmLoadingStatus, setAvatar } from './action';

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
  avatar: string,
  films: Films,
  film: Film,
  sortedFilms: Films,
  genre: string,
  similarFilms: Films,
  promoFilm: Film,
  comments: Comments,
  commentError: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean,
  isFilmLoading: boolean,
  loginError: string,
}

const initialState: InitialStateType = {
  avatar: '',
  films: [],
  film: emptyFilm,
  sortedFilms: [],
  genre: AllGENRES,
  similarFilms: [],
  promoFilm: emptyFilm,
  comments: [],
  commentError: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: true,
  isFilmLoading: true,
  loginError: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAvatar, (state, action) => {
      state.avatar = action.payload;
    })
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
    .addCase(loadOneFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(cleanOneFilm, (state) => {
      state.film = emptyFilm;
    })
    .addCase(loadSimilar, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentError, (state, action) => {
      state.commentError = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setFilmLoadingStatus, (state, action) => {
      state.isFilmLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setLoginError, (state, action) => {
      state.loginError = action.payload;
    });
});

export { reducer };

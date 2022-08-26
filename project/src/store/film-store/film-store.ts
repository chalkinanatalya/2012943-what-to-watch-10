import { createSlice } from '@reduxjs/toolkit';
import { store } from '..';
import { AllGENRES, AppRoute, NameSpace } from '../../const';
import { Film } from '../../types/film';
import { FilmStore } from '../../types/film-store';
import { redirectToRoute } from '../action';
import { fetchFavoriteAction, fetchFilmsAction, fetchOneFilmAction, fetchPromoAction, fetchSimilarAction, postIsFavoriteAction } from '../api-actions';

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

const initialState: FilmStore = {
  films: [],
  film: emptyFilm,
  promoFilm: emptyFilm,
  similarFilms: [],
  isDataLoading: true,
  isFilmLoading: true,
  sortedFilms: [],
  genre: AllGENRES,
  favorite: [],
};

export const filmStore = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    selectGenre: (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    },
    getSortedFilmsList: (state) => {
      if (state.genre === AllGENRES) {
        state.sortedFilms = state.films;
      } else {
        state.sortedFilms = state.films.filter((film) => film.genre === state.genre);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.sortedFilms = state.films;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        state.similarFilms = [];
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchOneFilmAction.pending, (state) => {
        state.film = emptyFilm;
        state.isFilmLoading = true;
      })
      .addCase(fetchOneFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchOneFilmAction.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 404') {
          state.isFilmLoading = false;
          store.dispatch(redirectToRoute(AppRoute.NotFound));
        }
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
      })
      .addCase(postIsFavoriteAction.fulfilled, (state, action) => {
        state.film = action.payload.data;
        if (action.payload.isPromo) {
          state.promoFilm = action.payload.data;
        }
      });
  }
});

export const { selectGenre, getSortedFilmsList } = filmStore.actions;

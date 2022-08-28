import { createSlice } from '@reduxjs/toolkit';
import { AllGENRES, NameSpace } from '../../const';
import { FilmStore } from '../../types/film-store';
import { fetchFavoriteAction, fetchFilmsAction, fetchOneFilmAction, fetchPromoAction, fetchSimilarAction, sendIsFavoriteAction } from '../api-actions';
import { emptyFilm } from './film-store-const';


const initialState: FilmStore = {
  films: [],
  film: emptyFilm,
  promoFilm: emptyFilm,
  similarFilms: [],
  isDataLoading: true,
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
    resetFavorite: (state) => {
      state.favorite = [];
      state.film.isFavorite = false;
      state.promoFilm.isFavorite = false;
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
      .addCase(fetchOneFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
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
      .addCase(sendIsFavoriteAction.fulfilled, (state, action) => {
        state.film = action.payload;
        if (state.film.id === state.promoFilm.id) {
          state.promoFilm = action.payload;
        }
      });
  }
});

export const { selectGenre, getSortedFilmsList, resetFavorite } = filmStore.actions;

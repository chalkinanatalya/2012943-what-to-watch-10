import { createReducer } from '@reduxjs/toolkit';
import { AllGENRES } from '../const';
import { filmsList } from '../mocks/films';
import { similarFilms } from '../mocks/similar-films';
import { Film, Films } from '../types/film';
import { selectGenre, getFilmsList } from './action';

type InitialStateType = {
  films: Films,
  genre: string,
  similarFilms: Films
  promoFilm: Film
}

const initialState: InitialStateType = {
  films: filmsList,
  genre: AllGENRES,
  similarFilms: similarFilms,
  promoFilm: filmsList[0]
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsList, (state, action) => {
      if (state.genre === AllGENRES) {
        state.films = filmsList;
      } else {
        state.films = filmsList.filter((film) => film.genre === state.genre);
      }
    });
});

export { reducer };

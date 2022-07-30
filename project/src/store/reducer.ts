import { createReducer } from '@reduxjs/toolkit';
import { Genre } from '../const';
import { films } from '../mocks/films';
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
  films: films,
  genre: Genre.AllGenres,
  similarFilms: similarFilms,
  promoFilm: films[0]
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsList, (state, action) => {
      if (state.genre === Genre.AllGenres) {
        state.films = films;
      } else {
        state.films = films.filter((film) => film.genre.toUpperCase() === state.genre);
      }
    });
});

export { reducer };

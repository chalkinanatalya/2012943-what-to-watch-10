/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmList from '../film-list/film-list';
import { selectGenre, getFilmsList } from '../../store/action';
import { MouseEvent } from 'react';
import { filmsList } from '../../mocks/films';

function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();

  const { films, genre } = useAppSelector((state) => state);

  const changeGenre = (evt: MouseEvent<HTMLAnchorElement>) => {
    dispatch(selectGenre({ genre: evt.currentTarget.id }));
    dispatch(getFilmsList());
  };

  const genres = ['All genres', ...new Set(filmsList.map((film) => film.genre))];

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {genres.map((tabGenre) => (<li key={tabGenre} className={`catalog__genres-item  ${genre === tabGenre ? 'catalog__genres-item--active' : ''}`}> <a href="#" className="catalog__genres-link" id={tabGenre} onClick={changeGenre}>{tabGenre}</a> </li>))}
      </ul>
      <FilmList films={films} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default GenresList;

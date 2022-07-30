/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmList from '../film-list/film-list';
import { selectGenre, getFilmsList } from '../../store/action';
import { Genre } from '../../const';
import {MouseEvent} from 'react';

function GenresList(): JSX.Element {

  const dispatch = useAppDispatch();

  const { films } = useAppSelector((state) => state);

  const changeGenre = (evt: MouseEvent<HTMLAnchorElement>) => {

    dispatch(selectGenre({genre: evt.currentTarget.id}));
    dispatch(getFilmsList());

  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        <li className="catalog__genres-item catalog__genres-item--active">
          <a href="#" className="catalog__genres-link" id={Genre.AllGenres} onClick={changeGenre}>All genres</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Comedies} onClick={changeGenre}>Comedies</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Crime} onClick={changeGenre}>Crime</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Documentary} onClick={changeGenre}>Documentary</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Dramas} onClick={changeGenre}>Dramas</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Horror} onClick={changeGenre}>Horror</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.KidsFamily} onClick={changeGenre}>Kids & Family</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Romance} onClick={changeGenre}>Romance</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.SciFi} onClick={changeGenre}>Sci-Fi</a>
        </li>
        <li className="catalog__genres-item">
          <a href="#" className="catalog__genres-link" id={Genre.Thriller} onClick={changeGenre}>Thrillers</a>
        </li>
      </ul>
      <FilmList films={films}/>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default GenresList;

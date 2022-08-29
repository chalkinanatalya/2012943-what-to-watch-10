import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmList from '../film-list/film-list';
import { selectGenre, getSortedFilmsList } from '../../store/film-store/film-store';
import { MouseEvent, useState } from 'react';
import ShowButton from '../show-button/show-button';
import { FILMS_AMOUNT } from '../../const';
import { getFilms, getGenre, getSortedFilms } from '../../store/film-store/selector';

function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();

  const [filmsToShow, setFilmsToShow] = useState(FILMS_AMOUNT);

  const films = useAppSelector(getFilms);
  const genre = useAppSelector(getGenre);
  const sortedFilms = useAppSelector(getSortedFilms);

  const handleChangeGenre = (evt: MouseEvent<HTMLAnchorElement>): void => {
    setFilmsToShow(FILMS_AMOUNT);
    dispatch(selectGenre({ genre: evt.currentTarget.id }));
    dispatch(getSortedFilmsList());
  };

  const handleShowMore = (): void => {
    setFilmsToShow(sortedFilms.length - filmsToShow >= FILMS_AMOUNT ? filmsToShow + FILMS_AMOUNT : sortedFilms.length);
  };

  const handleGenreList = (): JSX.Element[] => {
    const markup = genres.map((tabGenre) => (
      <li key={tabGenre} className={`catalog__genres-item  ${genre === tabGenre ? 'catalog__genres-item--active' : ''}`}>
        <div className="catalog__genres-link" id={tabGenre} onClick={() => handleChangeGenre}>{tabGenre}</div>
      </li>
    ));
    return markup;
  };

  const genres = ['All genres', ...new Set(films.map((film) => film.genre))];

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        {handleGenreList()}
      </ul>
      <FilmList films={sortedFilms.slice(0, filmsToShow)} />
      {sortedFilms.length > filmsToShow ? <div className="catalog__more"> <ShowButton onShowMore={handleShowMore} /> </div> : ''}
    </section>
  );
}

export default GenresList;

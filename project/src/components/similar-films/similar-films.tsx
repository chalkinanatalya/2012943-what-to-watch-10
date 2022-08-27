import { useAppSelector } from '../../hooks';
import FilmList from '../film-list/film-list';
import { store } from '../../store';
import { fetchSimilarAction } from '../../store/api-actions';
import { memo, useEffect } from 'react';
import { getSimilarFilms } from '../../store/film-store/selector';

type SimilarFilmsProps = {
  filmId: string | undefined,
}

function SimilarFilms({ filmId }: SimilarFilmsProps): JSX.Element {
  const similarFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    store.dispatch(fetchSimilarAction(filmId));
  }, [filmId]);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        <FilmList films={similarFilms.slice(0, 4)} />
      </div>
    </section>
  );
}

export default memo(SimilarFilms, (prevProps, nextProps) => prevProps.filmId === nextProps.filmId);

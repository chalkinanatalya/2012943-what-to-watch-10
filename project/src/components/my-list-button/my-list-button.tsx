import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoriteAction, postIsFavoriteAction } from '../../store/api-actions';

type MyListButtonProps = {
  filmType: string
}

function MyListButton({ filmType }: MyListButtonProps): JSX.Element {
  const { film, promoFilm, favorite } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const id = filmType === 'film' ? film.id : promoFilm.id;
  const status = filmType === 'film' ? Number(!film.isFavorite) : Number(!promoFilm.isFavorite);
  const isPromo = filmType === 'promo';

  useEffect(() => {
    store.dispatch(fetchFavoriteAction());
  }, [film]);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={() => dispatch(postIsFavoriteAction({ id: id, status: status, isPromo: isPromo }))}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {film.isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favorite.length}</span>
    </button>
  );
}

MyListButton.defaultProps = {
  filmType: 'film',
};
export default MyListButton;

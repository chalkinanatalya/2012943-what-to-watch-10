import { useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { redirectToRoute } from '../../store/action';
import { fetchFavoriteAction, postIsFavoriteAction } from '../../store/api-actions';
import { Film } from '../../types/film';

type MyListButtonProps = {
  filmType: string
}

function MyListButton({ filmType }: MyListButtonProps): JSX.Element {
  const { film, promoFilm, favorite, authorizationStatus } = useAppSelector((state) => state);
  const selectedFilm: Film = filmType === 'film' ? film : promoFilm;
  const isPromo = filmType === 'promo';
  const dispatch = useAppDispatch();

  const isAuthorizedHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postIsFavoriteAction({ id: selectedFilm.id, status: Number(!selectedFilm.isFavorite), isPromo: isPromo }));
    } else {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  };

  useEffect(() => {
    store.dispatch(fetchFavoriteAction());
  }, [film]);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={() => isAuthorizedHandler()}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {selectedFilm.isFavorite && authorizationStatus === AuthorizationStatus.Auth ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      {authorizationStatus === AuthorizationStatus.Auth ? <span className="film-card__count">{favorite.length}</span> : ''}
    </button>
  );
}

MyListButton.defaultProps = {
  filmType: 'film',
};
export default MyListButton;

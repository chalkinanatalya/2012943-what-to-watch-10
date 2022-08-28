import { memo, useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { redirectToRoute } from '../../store/action';
import { fetchFavoriteAction, sendIsFavoriteAction } from '../../store/api-actions';
import { getFavorite, getFilm, getPromoFilm } from '../../store/film-store/selector';
import { getAuthorizationStatus } from '../../store/user-store/selector';
import { Film } from '../../types/film';

type MyListButtonProps = {
  filmType: string
}

function MyListButton({ filmType }: MyListButtonProps): JSX.Element {
  const film = useAppSelector(getFilm);
  const promoFilm = useAppSelector(getPromoFilm);
  const favorite = useAppSelector(getFavorite);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const selectedFilm: Film = filmType === 'film' ? film : promoFilm;
  const dispatch = useAppDispatch();

  const handleAddToFavorite = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(sendIsFavoriteAction({ id: selectedFilm.id, status: Number(!selectedFilm.isFavorite) }));
    } else {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      store.dispatch(fetchFavoriteAction());
    }
  }, [authorizationStatus, film]);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={() => handleAddToFavorite}>
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

export default memo(MyListButton);

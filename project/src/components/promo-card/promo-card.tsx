import { memo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getPromoFilm } from '../../store/film-store/selector';
import MyListButton from '../my-list-button/my-list-button';

function PromoCard(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);

  const dispatch = useAppDispatch();
  const path = generatePath(AppRoute.Film, { id: String(promoFilm.id) });

  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <Link to={path} className="small-film-card__link"><h2 className="film-card__title">{promoFilm.name}</h2></Link>
          <p className="film-card__meta">
            <span className="film-card__genre">{promoFilm.genre}</span>
            <span className="film-card__year">{promoFilm.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={() => dispatch(redirectToRoute(generatePath(AppRoute.Player, { id: String(promoFilm.id), filmType: 'promo' })))} >
              <svg viewBox="0 0 19 19" width="19" height="19" >
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <MyListButton filmType={'promo'} />
          </div>
        </div>
      </div >
    </div >
  );
}

export default memo(PromoCard);

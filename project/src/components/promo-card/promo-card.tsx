import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';

function PromoCard(): JSX.Element {
  const { promoFilm } = useAppSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{promoFilm.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{promoFilm.genre}</span>
            <span className="film-card__year">{promoFilm.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={() => dispatch(redirectToRoute(generatePath(AppRoute.Player, { id: String(promoFilm.id) })))} >
              <svg viewBox="0 0 19 19" width="19" height="19" >
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list film-card__button" type="button" onClick={() => navigate(AppRoute.MyList)}>
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
              <span>My list</span>
              <span className="film-card__count">9</span>
            </button>
          </div>
        </div>
      </div >
    </div >
  );
}

export default PromoCard;

import { useEffect } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import MyListButton from '../../components/my-list-button/my-list-button';
import SimilarFilms from '../../components/similar-films/similar-films';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchOneFilmAction } from '../../store/api-actions';
import { getFilm } from '../../store/film-store/selector';
import { getAuthorizationStatus } from '../../store/user-store/selector';
import LoadingScreen from '../loading-screen/loading-screen';


const addReviewButton = (authorizationStatus: string, id: string | undefined): JSX.Element | string => {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (<Link to={generatePath(AppRoute.AddReview, { id: id })} className="btn film-card__button">Add review</Link>);
  } else {
    return '';
  }
};

function FilmInfo(): JSX.Element {
  const { id } = useParams();
  const film = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (film.id !== Number(id)) {
      store.dispatch(fetchOneFilmAction(id));
    }
  });

  if (film.id !== Number(id)) {
    return (
      <LoadingScreen />
    );
  }

  const filmCardStyle = {
    background: film ? film.backgroundColor : '#fff'
  };

  return (
    <>
      <section className="film-card film-card--full" style={filmCardStyle}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header page={'Main'} />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={generatePath(AppRoute.Player, { id: id, filmType: 'film' })} className="btn btn--play film-card__button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <MyListButton />
                {addReviewButton(authorizationStatus, id)}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <SimilarFilms filmId={id} />
        <Footer />
      </div>
    </>
  );
}

export default FilmInfo;

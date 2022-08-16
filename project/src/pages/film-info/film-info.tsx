import { useEffect } from 'react';
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFound from '../../components/not-found/not-found';
import SimilarFilms from '../../components/similar-films/similar-films';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchOneFilmAction } from '../../store/api-actions';


const addReviewButton = (authorizationStatus: string, id: string | undefined): JSX.Element | string => {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (<Link to={generatePath(AppRoute.AddReview, { id: id })} className="btn film-card__button">Add review</Link>);
  } else {
    return '';
  }
};

function FilmInfo(): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    store.dispatch(fetchOneFilmAction(id));
  }, [id]);

  const { film, authorizationStatus } = useAppSelector((state) => state);

  const filmCardStyle = {
    background: film ? film.backgroundColor : '#fff'
  };

  if (film.id === -1) {
    return <NotFound />;
  } else {
    return (
      <>
        <section className="film-card film-card--full" style={filmCardStyle}>
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>
            <Header />

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">
                  <Link to={generatePath(AppRoute.Player, { id: id })} className="btn btn--play film-card__button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list film-card__button" type="button" onClick={() => navigate(AppRoute.MyList)}>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                    <span className="film-card__count">9</span>
                  </button>
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
}

export default FilmInfo;

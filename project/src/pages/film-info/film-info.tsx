import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFound from '../../components/not-found/not-found';
import Tabs from '../../components/tabs/tabs';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { Comments } from '../../types/comment';
import { Film } from '../../types/film';

type FilmInfoProps = {
  comments: Comments,
}

function FilmInfo({ comments }: FilmInfoProps): JSX.Element {
  const navigate = useNavigate();

  const { films, similarFilms } = useAppSelector((state) => state);

  const { id } = useParams();

  const promoFilm: Film | undefined = films.find((film) => String(film.id) === id);

  if (!promoFilm) {
    return <NotFound />;
  } else {
    return (
      <>
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
            </div>

            <h1 className="visually-hidden">WTW</h1>
            <Header login="Sign out" />

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{promoFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promoFilm.genre}</span>
                  <span className="film-card__year">{promoFilm.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(AppRoute.Player)}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
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
                  <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={promoFilm.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="film-card__desc">
                <Tabs film={promoFilm} comments={comments} />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <div className="catalog__films-list">
              <FilmList films={similarFilms} />
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default FilmInfo;

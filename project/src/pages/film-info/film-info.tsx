import { generatePath, Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFound from '../../components/not-found/not-found';
import SimilarFilms from '../../components/similar-films/similar-films';
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

  const { id } = useParams();
  const { films } = useAppSelector((state) => state);

  const selectedFilm: Film | undefined = films.find((film) => String(film.id) === id);
  const filmCardStyle = {
    background: selectedFilm ? selectedFilm.backgroundColor : '#fff'
  };

  if (!selectedFilm) {
    return <NotFound />;
  } else {
    return (
      <>
        <section className="film-card film-card--full" style={filmCardStyle}>
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={selectedFilm.backgroundImage} alt={selectedFilm.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>
            <Header />

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{selectedFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{selectedFilm.genre}</span>
                  <span className="film-card__year">{selectedFilm.released}</span>
                </p>

                <div className="film-card__buttons">
                  <Link to={generatePath(AppRoute.Player, { id: String(id) })} className="btn btn--play film-card__button">
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
                  <Link to={generatePath(AppRoute.AddReview, { id: String(id) })} className="btn film-card__button">Add review</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={selectedFilm.posterImage} alt={`${selectedFilm.name} poster`} width="218" height="327" />
              </div>

              <div className="film-card__desc">
                <Tabs film={selectedFilm} comments={comments} />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <SimilarFilms filmId={id}/>
          <Footer />
        </div>
      </>
    );
  }
}

export default FilmInfo;

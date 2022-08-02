import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../../components/logo/logo';
import FormComment from '../../components/form-comment/form-comment';
import { useAppSelector } from '../../hooks';
import { Film } from '../../types/film';
import NotFound from '../../components/not-found/not-found';


function AddReview(): JSX.Element {
  const { films } = useAppSelector((state) => state);

  const { id } = useParams();

  const selectedFilm: Film | undefined = films.find((film) => String(film.id) === id);
  const filmCardStyle = {
    background: selectedFilm ? selectedFilm.backgroundColor : '#fff'
  };
  if (!selectedFilm) {
    return <NotFound />;
  } else {
    return (
      <section style={filmCardStyle} className="film-card film-card--full " id={String(selectedFilm.id)}>
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={selectedFilm.backgroundImage} alt='film' />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Logo />
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Film} className="breadcrumbs__link">{selectedFilm.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.AddReview} className="breadcrumbs__link">Add review</Link>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link to={AppRoute.Main} className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={selectedFilm.posterImage} alt={selectedFilm.name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <FormComment />
        </div>
      </section>
    );
  }
}

export default AddReview;

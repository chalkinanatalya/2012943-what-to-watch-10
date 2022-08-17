import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../../components/logo/logo';
import FormComment from '../../components/form-comment/form-comment';
import { useAppSelector } from '../../hooks';
import NotFound from '../../components/not-found/not-found';
import LogSignBar from '../../components/log-sign-bar/log-sign-bar';


function AddReview(): JSX.Element {
  const { film } = useAppSelector((state) => state);

  const filmCardStyle = {
    background: film ? film.backgroundColor : '#fff'
  };
  if (!film) {
    return <NotFound />;
  } else {
    return (
      <section style={filmCardStyle} className="film-card film-card--full " id={String(film.id)}>
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt='film' />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Logo />
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={generatePath(AppRoute.Film, { id: String(film.id) })} className="breadcrumbs__link">{film.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link to={generatePath(AppRoute.AddReview, { id: String(film.id) })} className="breadcrumbs__link">Add review</Link>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <LogSignBar />
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={film.name} width="218" height="327" />
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

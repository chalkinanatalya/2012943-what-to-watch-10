import { generatePath, Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavorite, getFilm } from '../../store/film-store/selector';
import { Film } from '../../types/film';
import LogSignBar from '../log-sign-bar/log-sign-bar';

type HeaderProps = {
  page: string;
}

const addHeaderClass = (page: string): string => {
  switch (page) {
    case 'My list':
      return 'page-header user-page__head';
    case 'Sign in':
      return 'page-header user-page__head';
    case 'Add review':
      return 'page-header';
    case 'Main':
      return 'page-header film-card__head';
    default:
      return '';
  }
};

const showExtraInfo = (page: string, film: Film, length: number): JSX.Element | undefined => {
  switch (page) {
    case 'My list':
      return <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{length}</span></h1>;
    case 'Sign in':
      return <h1 className="page-title user-page__title">Sign in</h1>;
    case 'Add review':
      return (
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
      );
  }
};

function Header({ page }: HeaderProps): JSX.Element {
  const favorite = useAppSelector(getFavorite);
  const film = useAppSelector(getFilm);

  return (
    <header className={addHeaderClass(page)}>
      <div className="logo">
        <Logo />
      </div>
      {showExtraInfo(page, film, favorite.length)}
      {page === 'Sign in' ? '' : <ul className="user-block"> <LogSignBar /></ul>}
    </header>
  );
}

export default Header;

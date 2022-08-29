import './not-found.css';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/film-store/selector';

function NotFound(): JSX.Element {
  const films = useAppSelector(getFilms);

  const getNoLink = (): JSX.Element => {
    const randomFilm = Math.floor(Math.random() * films.length);
    return <p><Link to={generatePath(AppRoute.Film, { id: String(randomFilm) })} className="no">NO, I&apos;m Feeling Lucky</Link></p>;
  };

  return (
    <div className='not-found-container'>
      <section className="notFound">
        <div className="img">
          <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
          <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
        </div>
        <div className="text">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <h3>BACK TO HOME?</h3>
          <p><Link to={AppRoute.Main} className="yes">YES, I&apos;m a Chicken</Link></p>
          {getNoLink()}
        </div>
      </section>
    </div>
  );
}

export default NotFound;

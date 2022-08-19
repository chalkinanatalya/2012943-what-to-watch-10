import './not-found.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
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
          <Link to={AppRoute.Main} className="yes">YES</Link>
          <Link to={AppRoute.Main} className="no">NO</Link>
        </div>
      </section>
    </div>
  );
}

export default NotFound;

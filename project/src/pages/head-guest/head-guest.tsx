import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';

function HeadGuest(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        {/* <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" /> */}
        <img src="img/bg-header.jpg" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <div className="logo">
          <Logo />
        </div>

        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>
      </header>

    </section>
  );
}

export default HeadGuest;

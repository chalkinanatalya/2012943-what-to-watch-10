import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import FormComment from '../../components/form-comment/form-comment';
import { AppRoute } from '../../const';

function SignIn(): JSX.Element {

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <FormComment />
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;

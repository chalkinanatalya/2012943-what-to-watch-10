import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

const logSignBar = (authorizationStatus: string, onClick: VoidFunction) => {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <>
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <div className="user-block__link" onClick={onClick}>Sign out</div>
        </li>
      </>
    );
  } else {
    return <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>;
  }
};


function Header(): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleSignOutClick = () => dispatch(logoutAction());

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={AppRoute.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      <ul className="user-block">
        {logSignBar(authorizationStatus, handleSignOutClick)}
      </ul>
    </header>
  );
}

export default Header;

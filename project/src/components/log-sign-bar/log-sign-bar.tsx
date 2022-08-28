import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { resetFavorite } from '../../store/film-store/film-store';
import { getAuthorizationStatus, getAvatar } from '../../store/user-store/selector';

function LogSignBar(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const avatar = useAppSelector(getAvatar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStartLogout = (): void => {
    dispatch(resetFavorite());
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <>
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => navigate(AppRoute.MyList)}>
            <img src={avatar} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <div className="user-block__link" onClick={handleStartLogout}>Sign out</div>
        </li>
      </>
    );
  } else {
    return <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>;
  }
}

export default LogSignBar;

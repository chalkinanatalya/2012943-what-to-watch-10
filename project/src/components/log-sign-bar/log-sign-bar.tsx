import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function LogSignBar(): JSX.Element {
  const { authorizationStatus, avatar } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <>
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={avatar} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <div className="user-block__link" onClick={() => dispatch(logoutAction())}>Sign out</div>
        </li>
      </>
    );
  } else {
    return <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>;
  }
}

export default LogSignBar;

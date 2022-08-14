import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PublicRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element;
}

function PublicRoute(props: PublicRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus !== AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}

export default PublicRoute;

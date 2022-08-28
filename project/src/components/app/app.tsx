import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import FilmInfo from '../../pages/film-info/film-info';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import AddReview from '../../pages/review/review';
import SignIn from '../../pages/sign-in/sign-in';
import { getIsDataLoading, getSortedFilms } from '../../store/film-store/selector';
import { getAuthorizationStatus } from '../../store/user-store/selector';
import HistoryRouter from '../history-route/history-route';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import PublicRoute from '../public-route/public-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const sortedFilms = useAppSelector(getSortedFilms);
  const isDataLoading = useAppSelector(getIsDataLoading);


  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />

        <Route path={AppRoute.SignIn} element={
          <PublicRoute authorizationStatus={authorizationStatus}>
            <SignIn />
          </PublicRoute>
        }
        />

        <Route path={AppRoute.Film} element={<FilmInfo />} />
        <Route path={AppRoute.Player} element={<Player />} />

        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList films={sortedFilms} />
          </PrivateRoute>
        }
        />

        <Route path={AppRoute.AddReview} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <AddReview />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import FilmInfo from '../../pages/film-info/film-info';
import MainScreen from '../../pages/main-screen/main-screen';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import AddReview from '../../pages/review/review';
import SignIn from '../../pages/sign-in/sign-in';
import { Comments } from '../../types/comment';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  comments: Comments,
}

function App({ comments }: AppScreenProps): JSX.Element {
  const { films } = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.Film} element={<FilmInfo comments={comments} />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <MyList films={films} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.AddReview} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <AddReview />
          </PrivateRoute>
        }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



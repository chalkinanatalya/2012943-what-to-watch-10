import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, AllGENRES } from '../../const';
import App from './app';
import { makeFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore();
const mockFilm = makeFakeFilm();
const mockFilms = new Array(1).fill(null).map(() => (mockFilm));

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    loginError: 'Please enter a valid password',
  },
  FILM: {
    films: mockFilms,
    film: mockFilm,
    promoFilm: mockFilm,
    similarFilms: mockFilms,
    isDataLoading: false,
    sortedFilms: mockFilms,
    genre: AllGENRES,
    favorite: mockFilms
  },
  COMMENT: {},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "PromoFilm" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  // it('should render "AuthScreen" when user navigate to "/login"', () => {
  //   history.push(AppRoute.SignIn);

  //   render(fakeApp);

  //   expect(screen.getByRole('radio')).toBeInTheDocument();
  //   expect(screen.getByText(/Please enter a valid password/i)).toBeInTheDocument();
  //   expect(screen.getByRole('input')).toHaveAttribute('placeholder');
  // });

  it('should render "FilmPage" when user navigate to "/film"', () => {
    history.push(generatePath(AppRoute.Film, { id: String(mockFilm.id) }));

    render(fakeApp);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player"', () => {
    history.push(generatePath(AppRoute.Player, { id: String(mockFilm.id), filmType: 'film' }));

    render(fakeApp);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: `My list ${mockFilms.length}` })).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/review"', () => {
    history.push(AppRoute.AddReview);

    render(fakeApp);

    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('add-review__btn');
    expect(screen.getByRole('radio', { name: 'Rating 1' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('PAGE NOT FOUND')).toBeInTheDocument();
    expect(screen.getByText('BACK TO HOME?')).toBeInTheDocument();
  });
});

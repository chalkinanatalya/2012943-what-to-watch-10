import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AllGENRES, AuthorizationStatus } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import NotFound from './not-found';

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
      <NotFound />
    </HistoryRouter>
  </Provider>
);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', async () => {

    render(fakeApp);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'NO, I\'m Feeling Lucky' })).toHaveAttribute('href', `/film/${mockFilm.id}`);

  });
});

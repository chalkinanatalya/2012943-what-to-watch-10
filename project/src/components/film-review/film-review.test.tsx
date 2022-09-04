import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeComment, makeFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FilmReview from './film-review';

const mockStore = configureMockStore();
const mockFilm = makeFakeFilm();
const mockComment = makeFakeComment();
const mockComments = new Array(1).fill(null).map(() => (mockComment));

const store = mockStore({
  USER: {},
  FILM: {
    film: mockFilm
  },
  COMMENT: {
    comments: mockComments
  },
});
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilmReview />
    </HistoryRouter>
  </Provider>
);

describe('Component: FilmReview', () => {
  it('should render correctly', async () => {
    render(fakeApp);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
  });
});

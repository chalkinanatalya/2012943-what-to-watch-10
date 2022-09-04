import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Details from './details';

const mockFilm = makeFakeFilm();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <Details film={mockFilm} />
  </HistoryRouter>
);

describe('Component: Details', () => {
  it('should render "PromoFilm" when user navigate to "/"', () => {
    render(fakeApp);

    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

});

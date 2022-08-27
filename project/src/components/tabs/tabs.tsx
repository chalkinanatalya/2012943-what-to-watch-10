import { useState } from 'react';
import Details from '../details/details';
import Overview from '../overview/overview';
import FilmReview from '../film-review/film-review';
import { Film } from '../../types/film';
import './tabs.css';

type TabsProps = {
  film: Film,
};


function Tabs({ film }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const tab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview film={film} />;
      case 'details':
        return <Details film={film} />;
      case 'filmreview':
        return <FilmReview filmId={String(film.id)} />;
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === 'overview' ? 'film-nav__item--active' : ''}`}>
            <div className="film-nav__link" onClick={() => setActiveTab('overview')}>Overview</div>
          </li>
          <li className={`film-nav__item ${activeTab === 'details' ? 'film-nav__item--active' : ''}`}>
            <div className="film-nav__link" onClick={() => setActiveTab('details')}>Details</div>
          </li>
          <li className={`film-nav__item ${activeTab === 'filmreview' ? 'film-nav__item--active' : ''}`}>
            <div className="film-nav__link" onClick={() => setActiveTab('filmreview')}>Reviews</div>
          </li>
        </ul>
      </nav>
      {tab()}
    </>
  );
}

export default Tabs;

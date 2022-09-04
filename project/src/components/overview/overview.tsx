import { Film } from '../../types/film';

type OverviewProps = {
  film: Film,
};

const getRatingLevel = (rating: number): string => {
  const BAD = 3;
  const NORMAL = 5;
  const GOOD = 8;
  const VERY_GOOD = 10;

  if (rating < BAD) {
    return 'Bad';
  } else if (rating >= BAD && rating < NORMAL) {
    return 'Normal';
  } else if (rating >= NORMAL && rating < GOOD) {
    return 'Good';
  } else if (rating >= GOOD && rating < VERY_GOOD) {
    return 'Very good';
  } else {
    return 'Awesome';
  }
};


function Overview({ film }: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {film.description}
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default Overview;

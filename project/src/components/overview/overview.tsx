import { Film } from '../../types/film';

type OverviewProps = {
  film: Film,
};

const getRatingLevel = (rating: number): string => {
  const bad = 3;
  const normal = 5;
  const good = 8;
  const veryGood = 10;

  if (rating < bad) {
    return 'Bad';
  } else if (rating >= bad && rating < normal) {
    return 'Normal';
  } else if (rating >= normal && rating < good) {
    return 'Good';
  } else if (rating >= good && rating < veryGood) {
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

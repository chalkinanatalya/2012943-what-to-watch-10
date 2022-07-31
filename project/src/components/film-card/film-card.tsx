import { useState } from 'react';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Film } from '../../types/film';
import Videoplayer from '../videoplayer/videoplayer';

type FilmCardScreenProps = {
  film: Film,
};

function FilmCard({ film }: FilmCardScreenProps): JSX.Element {
  const [isShowing, setIsShowing] = useState(false);
  const navigate = useNavigate();

  const mouseOver = (): void => {
    setTimeout(() => setIsShowing(true), 1000);
  };

  const mouseLeave = (): void => {
    setIsShowing(false);
  };

  return (
    <article className="small-film-card catalog__films-card" id={String(film.id)} >
      <div className="small-film-card__image" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
        {isShowing ?
          <Videoplayer film={film} autoplay />
          : <img src={film.previewImage} alt={film.name} width="280" height="175" onClick={() => navigate(AppRoute.Film)} />}
      </div>
      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoute.Film, { id: String(film.id) })} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}


export default FilmCard;

import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Film } from '../../types/film';
import Videoplayer from '../videoplayer/videoplayer';

type FilmCardScreenProps = {
  film: Film,
};

function FilmCard({ film }: FilmCardScreenProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const mouseOver = (): void => {
    setIsPlaying(true);
  };

  const mouseLeave = (): void => {
    setIsPlaying(false);
  };

  return (
    <article className="small-film-card catalog__films-card" id={String(film.id)} >
      <div className="small-film-card__image" onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
        <Videoplayer film={film} isPlaying={isPlaying} />
      </div>
      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoute.Film, { id: String(film.id) })} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}


export default FilmCard;

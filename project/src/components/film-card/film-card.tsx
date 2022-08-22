import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { redirectToRoute } from '../../store/action';
import { Film } from '../../types/film';
import Videoplayer from '../videoplayer/videoplayer';

type FilmCardScreenProps = {
  film: Film,
};

function FilmCard({ film }: FilmCardScreenProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const path = generatePath(AppRoute.Film, { id: String(film.id) });

  const mouseOver = (): void => {
    setIsPlaying(true);
  };

  const mouseLeave = (): void => {
    setIsPlaying(false);
  };

  return (
    <article className="small-film-card catalog__films-card" id={String(film.id)}>
      <div className="small-film-card__image" onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={() => dispatch(redirectToRoute(path))}>
        <Videoplayer film={film} isPlaying={isPlaying} />
      </div>
      <h3 className="small-film-card__title">
        <Link to={path} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}


export default FilmCard;

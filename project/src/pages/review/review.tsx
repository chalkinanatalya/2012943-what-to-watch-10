import { useParams } from 'react-router-dom';
import FormComment from '../../components/form-comment/form-comment';
import { useAppSelector } from '../../hooks';
import NotFound from '../../components/not-found/not-found';
import { useEffect } from 'react';
import { fetchOneFilmAction } from '../../store/api-actions';
import { store } from '../../store';
import Header from '../../components/header/header';
import { getFilm } from '../../store/film-store/selector';


function AddReview(): JSX.Element {
  const { id } = useParams();
  const film = useAppSelector(getFilm);

  useEffect(() => {
    if (Number(id) !== film.id) {
      store.dispatch(fetchOneFilmAction(id));
    }
  }, [film.id, id]);

  const filmCardStyle = {
    background: film ? film.backgroundColor : '#fff'
  };
  if (!film) {
    return <NotFound />;
  } else {
    return (
      <section style={filmCardStyle} className="film-card film-card--full " id={String(film.id)}>
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt='film' />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header page={'Add review'} />

          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={film.name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <FormComment />
        </div>
      </section>
    );
  }
}

export default AddReview;
